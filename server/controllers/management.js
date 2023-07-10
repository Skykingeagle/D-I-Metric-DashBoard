import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Source from "../models/Source.js";
import regression from "regression";

//tracking
export const getPayRate = async (req, res) => {
  try {
    const payRate = await Employee.aggregate([
      {
        $project: {
          year: { $year: "$DateofHire" },
          PayRate: 1,
          GenderID: 1,
        },
      },
      {
        $match: {
          year: { $gte: 2016, $lte: 2022 },
        },
      },
      {
        $group: {
          _id: "$year",
          averagePayRate: { $avg: "$PayRate" },
          maleRatio: {
            $avg: {
              $cond: [{ $eq: ["$GenderID", true] }, 1, 0],
            },
          },
          femaleRatio: {
            $avg: {
              $cond: [{ $eq: ["$GenderID", false] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const lineData = [
      {
        id: "averagePayRate",
        color: "",
        data: payRate.map((item) => ({
          x: item._id,
          y: parseFloat(item.averagePayRate.toFixed(2)),
        })),
      },
      {
        id: "maleRatio",
        color: "",
        data: payRate.map((item) => ({
          x: item._id,
          y: parseFloat((item.maleRatio * 100).toFixed(2)),
        })),
      },
      {
        id: "femaleRatio",
        color: "",
        data: payRate.map((item) => ({
          x: item._id,
          y: parseFloat((item.femaleRatio * 100).toFixed(2)),
        })),
      },
    ];

    res.status(200).json(lineData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//prediction payrate
export const getPredPay = async (req, res) => {
  try {
    const historicData = await Employee.aggregate([
      {
        $match: {
          DateofHire: {
            $gte: new Date("2016-01-01"),
            $lte: new Date("2022-12-31"),
          },
        },
      },
      {
        $group: {
          _id: { $year: "$DateofHire" },
          averagePayRate: { $avg: "$PayRate" },
        },
      },
      {
        $project: {
          x: { $toString: "$_id" },
          y: { $round: ["$averagePayRate", 2] },
          _id: 0,
        },
      },
      {
        $sort: { x: 1 },
      },
    ]);

    const payRateData = historicData.map(({ x, y }) => ({
      x,
      y,
    }));

    const payRateResult = regression.linear(payRateData.map(({ x, y }) => [parseInt(x), y]));

    const predictedYear = 2023;
    const predictedPayRate = payRateResult.predict(predictedYear)[1];

    const roundedPayRate = parseFloat(predictedPayRate.toFixed(2));

    const predictedData = {
      x: predictedYear.toString(),
      y: roundedPayRate,
    };

    const combinedData = [
      {
        id: "averagePayRate",
        color: "hsl(261, 70%, 50%)",
        data: [...payRateData, predictedData],
      },
    ];

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


//prediction male
export const getPredMale = async (req, res) => {
  try {
    const maleRatio = await Employee.aggregate([
      {
        $project: {
          year: { $year: "$DateofHire" },
          GenderID: 1,
        },
      },
      {
        $match: {
          year: { $gte: 2016, $lte: 2022 },
        },
      },
      {
        $group: {
          _id: "$year",
          maleRatio: {
            $avg: {
              $cond: [{ $eq: ["$GenderID", true] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const maleRatioData = maleRatio.map(({ _id, maleRatio }) => ({
      x: _id.toString(),
      y: parseFloat((maleRatio * 100).toFixed(2)),
    }));

    const maleRatioResult = regression.linear(maleRatioData.map(({ x, y }) => [parseInt(x), y]));

    const predictedYear = 2023;
    const predictedMaleRatio = maleRatioResult.predict(predictedYear)[1];

    const roundedMaleRatio = parseFloat(predictedMaleRatio.toFixed(2));

    const predictedData = {
      x: predictedYear.toString(),
      y: roundedMaleRatio,
    };

    const combinedData = [
      {
        id: "maleRatio",
        color: "hsl(203, 70%, 50%)",
        data: [...maleRatioData, predictedData],
      },
    ];

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//prediction female
export const getPredFemale = async (req, res) => {
  try {
    const FemaleRatio = await Employee.aggregate([
      {
        $project: {
          year: { $year: "$DateofHire" },
          GenderID: 1,
        },
      },
      {
        $match: {
          year: { $gte: 2016, $lte: 2022 },
        },
      },
      {
        $group: {
          _id: "$year",
          FemaleRatio: {
            $avg: {
              $cond: [{ $eq: ["$GenderID", false] }, 1, 0],
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const FemaleRatioData = FemaleRatio.map(({ _id, FemaleRatio }) => ({
      x: _id.toString(),
      y: parseFloat((FemaleRatio * 100).toFixed(2)),
    }));

    const FemaleRatioResult = regression.linear(FemaleRatioData.map(({ x, y }) => [parseInt(x), y]));

    const predictedYear = 2023;
    const predictedMaleRatio = FemaleRatioResult.predict(predictedYear)[1];

    const roundedFemaleRatio = parseFloat(predictedMaleRatio.toFixed(2));

    const predictedData = {
      x: predictedYear.toString(),
      y: roundedFemaleRatio,
    };

    const combinedData = [
      {
        id: "FemaleRatio",
        color: "hsl(203, 70%, 50%)",
        data: [...FemaleRatioData, predictedData],
      },
    ];

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};











