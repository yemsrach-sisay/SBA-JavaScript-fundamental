const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  try {
    const result = [];

    if (ag.course_id == course.id) {
      for (let index = 0; index < submissions.length; index++) {
        const sub = submissions[index];
        let resultData = {};
        let rData = result.find((a) => a.id === sub.learner_id);
        if (rData) {
          continue;
        }

        let subs = submissions.filter((s) => s.learner_id == sub.learner_id);

        let score = 0;
        let pointsPossible = 0;
        subs.forEach((s) => {
          var subDate = new Date(s.submission.submitted_at);

          let asm = ag.assignments.find((a) => a.id === s.assignment_id);
          let asmDate = new Date(asm.due_at);

          let _score = 0;
          if (asmDate >= subDate) {
            if (asm.points_possible == 0) {
              throw new error("points_possible can not be zero");
            }
            pointsPossible = pointsPossible + asm.points_possible;
            _score = s.submission.score;
          } else if (asmDate < subDate) {
            if (asm.points_possible == 0) {
              throw new error("points_possible can not be zero");
            }

            _score = s.submission.score - 10;
          }
          score = score + _score;
          resultData[s.assignment_id] = _score;
        });

        let avg = score / pointsPossible;

        resultData.id = sub.learner_id;
        resultData["avg"] = avg;
        result.push(resultData);
      }
    } else {
      throw new error("invalid course id");
    }
    return result;

    /* const result = [
            {
              id: 125,
              avg: 0.985, // (47 + 150) / (50 + 150)
              1: 0.94, // 47 / 50
              2: 1.0, // 150 / 150
            },
            {
              id: 132,
              avg: 0.82, // (39 + 125) / (50 + 150)
              1: 0.78, // 39 / 50
              2: 0.833, // late: (140 - 15) / 150
            },
          ];*/
  } catch (error) {
    console.error(error.message);
  }
  return [];
}

var result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
