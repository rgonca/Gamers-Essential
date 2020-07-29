const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({

    title: { type: String },

    genre: {
        type: String,
        enum: ['ACTION', 'SHOOTER', 'RPG', 'PLATFORMS', 'HORROR', 'ADVENTURE', 'STRATEGY', 'FIGHTING', 'SPORTS']
    },

    brief: { type: String },

    description: { type: String },

    owner: { type: Schema.Types.ObjectId, ref: "User" },

    imageEvent: { type: String },

    eventDate: { type: Date },

    locationName: { type: String },

    loc: {
        city: {
            type: String,
            default: 'Madrid'
        },
        coordinates: [Number]
    },

    comments: { type: [String] },

    commentsUser: { type: [String] }

}, {
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema)
module.exports = Event


