let getRescentResult = {
    "status": "ok",
    "request_path": "v1/groups/recent_results",
    "request_type": "groups_recent_results",
    "server_timestamp": 1339782640,
    "finished_after_timestamp_used": 1338908448,
    "groups": [{
        "group": {
            "group_id": 29765,
            "group_name": "Internal Accounts department"
        }
    },
    {
        "group": {
            "group_id": 73645,
            "group_name": "Internal Sales Staff"
        }
    }
    ],
    "tests": [{
        "test": {
            "test_id": 64776,
            "test_name": "Health and safety exam"
        }
    }],
    "results": [{
        "result": {
            "user_id": 319118,
            "first": "Paul",
            "last": "Smith",
            "email": "paul@example.com",
            "test_id": 64776,
            "group_id": 29765,
            "percentage": 90,
            "points_scored": 18,
            "points_available": 20,
            "time_started": 1339778290,
            "time_finished": 1339781298,
            "status": "f",
            "duration": "00:50:08",
            "requires_grading": "No",
            "view_results_url": "https://www.classmarker.com/view/results/?required_parameters_here"
        }
    },
    {
        "result": {
            "user_id": 319119,
            "first": "Tracy",
            "last": "Thompson",
            "email": "tracey@example.com",
            "test_id": 64776,
            "group_id": 73645,
            "percentage": 95,
            "points_scored": 19,
            "points_available": 20,
            "time_started": 133977830,
            "time_finished": 133978998,
            "status": "f",
            "duration": "00:19:47",
            "requires_grading": "No",
            "view_results_url": "https://www.classmarker.com/view/results/?required_parameters_here"
        }
    }
    ],
    "num_results_available": 2,
    "num_results_returned": 2,
    "more_results_exist": false,
    "next_finished_after_timestamp": 133978998
};
let webHook = {

    "payload_type": "single_user_test_results_group",
    "payload_status": "live",
    "test": {
        "test_id": 103,
        "test_name": "Sample Test Name"
    },
    "group": {
        "group_id": 104,
        "group_name": "Sample Group Name"
    },
    "result": {
        "user_id": "3276524",
        "first": "Mary",
        "last": "Williams",
        "email": "mary@example.com",
        "percentage": 75.0,
        "points_scored": 9.0,
        "points_available": 12.0,
        "requires_grading": "Yes",
        "time_started": 1436263102,
        "time_finished": 1436263702,
        "duration": "00:05:40",
        "percentage_passmark": 50,
        "passed": true,
        "feedback": "Thanks for completing our Exam!",
        "give_certificate_only_when_passed": false,
        "certificate_url": "https://www.classmarker.com/pdf/certificate/SampleCertificate.pdf",
        "view_results_url": "https://www.classmarker.com/view/results/?required_parameters_here"
    },
    "questions": [
        {
            "question_id": 3542854,
            "question_type": "multiplechoice",
            "category_id": 1,
            "points_available": 2,
            "question": "What is the first step for treating a skin burn?",
            "options": {
                "A": "Apply oil or butter",
                "B": "Nothing should be done",
                "C": "Soak in water for five minutes",
                "D": "Apply antibiotic ointment"
            },
            "correct_option": "C",
            "points_scored": 2,
            "user_response": "C",
            "result": "correct",
            "feedback": "Great, and remember, never use oil on Skin burns!"
        },
        {
            "question_id": 10254859,
            "question_type": "multiplechoice",
            "category_id": 2,
            "points_available": 2,
            "question": "Select the options you should take when the fire alarm sounds:",
            "options": {
                "A": "Call you manager to see if you can leave the building",
                "B": "Exit the building immediately",
                "C": "Use the Lifts to exit faster",
                "D": "Use the stairwell to exit"
            },
            "correct_option": "B,D",
            "points_scored": 1,
            "user_response": "B",
            "result": "partial_correct",
            "feedback": "That is incorrect, the correct answers are A and C"
        },
        {
            "question_id": 5485962,
            "question_type": "truefalse",
            "category_id": 3,
            "points_available": 1,
            "question": "Our Support staff work 7 day a week",
            "options": {
                "A": "True",
                "B": "False"
            },
            "correct_option": "A",
            "points_scored": 1,
            "user_response": "A",
            "result": "correct",
            "feedback": "That is correct, we provide 7 day support"
        },
        {
            "question_id": 3896152,
            "question_type": "freetext",
            "category_id": 5,
            "points_available": 1,
            "question": "Our company website is: www.______.com",
            "options": {
                "exact_match": [
                    {
                        "content": "example"
                    },
                    {
                        "content": "example.com"
                    },
                    {
                        "content": "www.example.com"
                    },
                    {
                        "content": "http://www.example.com"
                    },
                    {
                        "content": "https://www.example.com"
                    }
                ]
            },
            "points_scored": 1,
            "user_response": "example",
            "result": "correct",
            "feedback": "Correct, always send our customers to our main website: www.example.com"
        },
        {
            "question_id": 6403973,
            "question_type": "matching",
            "category_id": 2,
            "points_available": 4,
            "question": "Match the options below:",
            "points_scored": 3,
            "options": {
                "A": {
                    "clue": "Product faulty",
                    "match": "Exchange or Refund",
                    "correct_option": "A",
                    "user_response": "A"
                },
                "B": {
                    "clue": "Customer mis-used and broke product",
                    "match": "No refund",
                    "correct_option": "B",
                    "user_response": "B"
                },
                "C": {
                    "clue": "Customer broke factory seal",
                    "match": "No refund",
                    "correct_option": "B",
                    "user_response": "B"
                },
                "D": {
                    "clue": "Incorrect product size purchased",
                    "match": "Exchange",
                    "correct_option": "D",
                    "user_response": "A"
                },
                "E": {
                    "match": "Have customer removed by security"
                }
            },
            "result": "partial_correct",
            "feedback": "Please check your incorrect matches"
        },
        {
            "question_id": 444564,
            "question_type": "essay",
            "category_id": 5,
            "points_available": 1,
            "question": "Describe some advantages of having test papers graded instantly:",
            "points_scored": 0,
            "user_response": "Users can see their results instantly, grading is accurate, save time from manual grading",
            "result": "requires_grading",
            "custom_feedback": "",
            "feedback": "Generic feedback here"
        },
        {
            "question_id": 442810,
            "question_type": "grammar",
            "category_id": 3,
            "points_available": 1,
            "question": "The car was parkked over their!",
            "answer": "The car was parked over there!",
            "points_scored": 1,
            "user_response": "The car was parked over there!",
            "result": "correct",
            "feedback": "Well done!"
        }
    ],
    "category_results": [
        {
            "category_id": 1,
            "name": "Health and Safety",
            "percentage": 66.7,
            "points_available": 6,
            "points_scored": 4
        },
        {
            "category_id": 2,
            "name": "Exit Procedure",
            "percentage": 100,
            "points_available": 2,
            "points_scored": 2
        },
        {
            "category_id": 3,
            "name": "General Knowledge",
            "percentage": 100,
            "points_available": 2,
            "points_scored": 2
        },
        {
            "category_id": 5,
            "name": "Sales",
            "percentage": 50,
            "points_available": 2,
            "points_scored": 1
        }
    ]
}


module.exports = {
    getRescentResult,
    webHook
};

