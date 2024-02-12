const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    gender: {
        type: String,
        require: true,
        trim: true
    },
    name: {
        title: {
            type: String,
            trim: true
        },
        first: {
            type: String,
            require: true,
            trim: true
        },
        last: {
            type: String,
            require: true,
            trim: true
        }
    },
    location: {
        street: {
            number: {
                type: Number,
                require: true
            },
            name: {
                type: String,
                require: true,
                trim: true
            }
        },
        city: {
            type: String,
            require: true,
            trim: true
        },
        state: {
            type: String,
            require: true,
            trim: true
        },
        country: {
            type: String,
            require: true,
            trim: true
        },
        postcode: {
            type: Number,
            require: true
        },
        coordinates: {
            latitude: {
                type: String,
                require: true
            },
            longitude: {
                type: String,
                require: true
            }
        },
        timezone: {
            offset: {
                type: String,
                require: true
            },
            description: {
                type: String,
                require: true
            }
        }
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    dob: {
        date: {
            type: Date,
            require: true
        },
        age: {
            type: Number,
            require: true
        }
    },
    phone: {
        type: String,
        require: true,
        trim: true
    },
    cell: {
        type: String,
        require: true,
        trim: true
    },
    id: {
        name: {
            type: String,
            require: true,
            trim: true
        },
        value: {
            type: String,
            require: true,
            trim: true
        }
    },
    picture: {
        large: {
            type: String,
            trim: true
        },
        medium: {
            type: String,
            trim: true
        },
        thumbnail: {
            type: String,
            trim: true
        }
    },
    nat: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    }
});

mongoose.model('users', UserSchema);