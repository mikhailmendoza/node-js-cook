
var UpdateUserTranscript = {
    User: {
        Id: { type: String }
    },
    Course: {
        Id: { type: String },
        IsAutoCreated: { type: Number }
    },
    Event: {
        Id: { type: String },
        Name: { type: String },
        IsAutoCreated: { type: Number }
    },
    Score: {
        Scored: { type: String },
        ScoreType: { type: String },
        Score: { type: String },
        PassGrade: { type: String },
        IsPassed: { type: Number }
    }
}

module.exports = { UpdateUserTranscript };
