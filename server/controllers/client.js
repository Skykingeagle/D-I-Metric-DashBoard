import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Source from "../models/Source.js";

//department overview

export const getDept = async (req, res) => {
  try {
    const deptData = await Department.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "DeptID",
          foreignField: "DeptID",
          as: "employees",
        },
      },
      {
        $project: {
          departmentName: "$Department",
          totalEmployees: { $size: "$employees" },
          males: {
            $size: {
              $filter: {
                input: "$employees",
                cond: { $eq: ["$$this.GenderID", true] }, 
              },
            },
          },
          females: {
            $size: {
              $filter: {
                input: "$employees",
                cond: { $eq: ["$$this.GenderID", false] }, 
              },
            },
          },
          avgPayRate: { $round: [{ $avg: "$employees.PayRate" }, 2] },
        },
      },
    ]);

    res.status(200).json(deptData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//employee list
export const getEmp = async (req, res) => {
  try {
    const empData = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "DeptID",
          foreignField: "DeptID",
          as: "departments",
        },
      },
      {
        $lookup: {
          from: "positions",
          localField: "PositionID",
          foreignField: "PositionID",
          as: "positions",
        },
      },
      {
        $lookup: {
          from: "sources",
          localField: "RecruitmentSourceID",
          foreignField: "RecruitmentSourceID",
          as: "RecruitmentSource",
        },
      },
      {
        $project: {
          Employee_Name: 1,
          EmpID: 1,
          PayRate: 1,
          country: 1,
          DepartmentName: { $arrayElemAt: ["$departments.Department", 0] },
          Position: { $arrayElemAt: ["$positions.Position", 0] },
          Sex: 1,
          RecruitmentSource: {
            $arrayElemAt: ["$RecruitmentSource.RecruitmentSource", 0],
          },
          PerformanceScore: 1,
          DateofHire: 1,
          _id: 1,
        },
      },
    ]);
    res.status(200).json(empData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//region
export const getRegion = async (req, res) => {
  try {
    const populationData = await Employee.aggregate([
      {
        $group: {
          _id: "$country",
          maleCount: {
            $sum: {
              $cond: [{ $eq: ["$GenderID", true] }, 1, 0],
            },
          },
          femaleCount: {
            $sum: {
              $cond: [{ $eq: ["$GenderID", false] }, 1, 0],
            },
          },
          totalCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          id: { $trim: { input: "$_id" } },
          value: "$totalCount",
          maleCount: "$maleCount",
          femaleCount: "$femaleCount",
        },
      },
    ]);

    res.status(200).json(populationData);
  } catch (error) {
    console.error({ message: error.message });
  }
};

//position
export const getPos = async (req, res) => {
  try {
    const data = await Employee.aggregate([
      {
        $lookup: {
          from: "positions",
          localField: "PositionID",
          foreignField: "PositionID",
          as: "position",
        },
      },
      {
        $unwind: "$position",
      },
      {
        $group: {
          _id: "$position.Position",
          countEmployees: { $sum: 1 },
          countMales: { $sum: { $cond: [{ $eq: ["$GenderID", true] }, 1, 0] } },
          countFemales: {
            $sum: { $cond: [{ $eq: ["$GenderID", false] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          position: "$_id",
          countEmployees: 1,
          countMales: 1,
          countFemales: 1,
          genderDisparity: {
            $abs: { $subtract: ["$countMales", "$countFemales"] },
          },
        },
      },
      {
        $sort: { genderDisparity: -1 },
      },
      {
        $limit: 6,
      },
    ]);

    const chartData = data.map((item) => ({
      position: item.position,
      totalEmployees: item.countEmployees,
      Males: item.countMales,
      Females: item.countFemales,
    }));

    console.log(chartData);
    res.status(200).json(chartData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//performance
export const getPerformance = async (req, res) => {
  try {
    const resStats = await Employee.aggregate([
      {
        $lookup: {
          from: "sources",
          localField: "RecruitmentSourceID",
          foreignField: "RecruitmentSourceID",
          as: "source",
        },
      },
      {
        $unwind: "$source",
      },
      {
        $group: {
          _id: "$source.RecruitmentSource",
          specialProjectCount: { $avg: "$SpecialProjectsCount" },
          count: { $sum: 1 },
          maleCount: {
            $sum: {
              $cond: { if: { $eq: ["$GenderID", true] }, then: 1, else: 0 },
            },
          },
          femaleCount: {
            $sum: {
              $cond: { if: { $eq: ["$GenderID", false] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $addFields: {
          genderDisparity: {
            $abs: { $subtract: ["$maleCount", "$femaleCount"] },
          },
        },
      },
      {
        $sort: { genderDisparity: -1 },
      },
      {
        $limit: 8,
      },
      {
        $project: {
          source: "$_id",
          specialProjectCount: { $ceil: "$specialProjectCount" },
          count: 1,
          maleCount: 1,
          femaleCount: 1,
          genderDisparity: 1,
        },
      },
    ]);

    const formattedData = resStats.map((entry) => ({
      id: entry.source,
      label: entry.source,
      value: entry.genderDisparity,
      color: entry.color,
      maleCount: entry.maleCount,
      femaleCount: entry.femaleCount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//source
export const getSources = async (req, res) => {
  try {
    const recruitmentSourceData = await Source.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "RecruitmentSourceID",
          foreignField: "RecruitmentSourceID",
          as: "employees",
        },
      },
      {
        $unwind: "$employees",
      },
      {
        $group: {
          _id: "$RecruitmentSource",
          totalEmployees: { $sum: 1 },
          maleCount: {
            $sum: {
              $cond: [
                { $eq: [{ $trim: { input: "$employees.Sex" } }, "M"] },
                1,
                0,
              ],
            },
          },
          femaleCount: {
            $sum: {
              $cond: [
                { $eq: [{ $trim: { input: "$employees.Sex" } }, "F"] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          source: "$_id",
          totalEmployees: 1,
          maleCount: 1,
          femaleCount: 1,
          genderDisparity: {
            $abs: { $subtract: ["$maleCount", "$femaleCount"] },
          },
        },
      },
      {
        $sort: { genderDisparity: -1 },
      },
      {
        $limit: 8,
      },
    ]);

    const formattedData = recruitmentSourceData.map((entry) => ({
      source: entry.source,
      totalEmployees: entry.totalEmployees,
      maleCount: entry.maleCount,
      femaleCount: entry.femaleCount,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//satisfaction across dept
export const getSat = async (req, res) => {
  try {
    const aggregation = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "DeptID",
          foreignField: "DeptID",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $group: {
          _id: "$department.Department",
          satisfaction: { $avg: "$EmpSatisfaction" },
          count: { $sum: 1 },
          maleCount: {
            $sum: {
              $cond: { if: { $eq: ["$GenderID", true] }, then: 1, else: 0 },
            },
          },
          femaleCount: {
            $sum: {
              $cond: { if: { $eq: ["$GenderID", false] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $project: {
          department: "$_id",
          satisfaction: { $round: ["$satisfaction", 2] },
          count: 1,
          maleCount: 1,
          femaleCount: 1,
        },
      },
    ]);

    res.status(200).json(aggregation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
