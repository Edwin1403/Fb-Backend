const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema

const userSchema = require({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        text: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
    },
    picture: {
        type: String,
        default:
            "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
    },
    cover: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
        trim: true,
    },
    bYear: {
        type: Number,
        required: true,
        trim: true,
    },
    bMonth: {
        type: Number,
        required: true,
        trim: true,
    },
    bDay: {
        type: Number,
        required: true,
        trim: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    friends: {
        type: Array,
        default: [],
    },
    following: {
        type: Array,
        default: [],
    },
    follower: {
        type: Array,
        default: [],
    },
    requests: {
        type: Array,
        default: [],
    },
    search: [
        {
            user: {
                type: ObjectId,
                ref: "User"
            }
        }
    ],
    details: {
        bio: {
            type: String,
        },
        otherName: {
            type: String,
        },
        job: {
            type: String,
        },
        workplace: {
            type: String,
        },
        highSchool: {
            type: String,
        },
        collage: {
            type: String,
        },
        currentCity: {
            type: String,
        },
        homeTown: {
            type: String,
        },
        relationShip: {
            type: String,
            enum: ['Single', 'In a relationship', 'Married', 'Divorced']
        },
        instagram: {
            type: String,
        },
        savedPosts: [
            {
                post: {
                    type: ObjectId,
                    ref: "Post"
                },
                savedAt: {
                    type: Date,
                    default: new Date(),
                }
            }
        ]
    }
},
    {
        timestamps: true,
    });

    module.exports= mongoose.model('User', userSchema);