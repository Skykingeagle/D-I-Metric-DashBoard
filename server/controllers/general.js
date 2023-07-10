import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Source from "../models/Source.js";

export const getDashboard = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      {
        $lookup: {
          from: "departments",
          localField: "DeptID",
          foreignField: "DeptID",
          as: "department",
        },
      },
      {
        $lookup: {
          from: "positions",
          localField: "PositionID",
          foreignField: "PositionID",
          as: "position",
        },
      },
      {
        $lookup: {
          from: "sources",
          localField: "RecruitmentSourceID",
          foreignField: "RecruitmentSourceID",
          as: "recruitmentSource",
        },
      },
      {
        $sort: { DateofHire: -1 }, // Sort by DateofHire in descending order
      },
      {
        $limit: 50, // Limit to the latest 50 records
      },
      {
        $project: {
          Employee_Name: 1,
          EmpID: 1,
          DepartmentName: { $arrayElemAt: ["$department.Department", 0] },
          Position: "$Position",
          PayRate: 1,
          country: 1,
          Sex: 1,
          RecruitmentSource: "$RecruitmentSource",
          PerformanceScore: 1,
          DateofHire: 1,
          _id: 1, //
        },
      },
    ]);

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const pushForm = async (req, res) => {
  try {
    const {
      EmpID,
      Employee_Name,
      DeptID,
      PayRate,
      PerformanceScore,
      PositionID,
      RecruitmentSourceID,
      GenderID,
      country,
      SpecialProjectsCount,
    } = req.body;

    const employee = new Employee({
      EmpID: EmpID,
      Employee_Name,
      DeptID: DeptID,
      PayRate,
      PerformanceScore,
      PositionID: PositionID,
      RecruitmentSourceID,
      GenderID: GenderID,
      country: country,
      SpecialProjectsCount: SpecialProjectsCount,
    });

    // Save the employee document to the database
    await employee.save();

    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
