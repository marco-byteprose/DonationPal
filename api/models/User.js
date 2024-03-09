const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Create schema
const UserSchema = new Schema({

    _id: {
        type: String
    },
    gender: {
        type: String,
        trim: true
    },
    name: {
        title: {
            type: String,
            trim: true
        },
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    location: {
        street: {
            number: {
                type: Number,
            },
            name: {
                type: String,
                trim: true
            }
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        postcode: {
            type: Number,
        },
        coordinates: {
            latitude: {
                type: String,
            },
            longitude: {
                type: String,
            }
        },
        timezone: {
            offset: {
                type: String,
            },
            description: {
                type: String,
            }
        }
    },
    email: {
        type: String,
        unique: true
    },
    dob: {
        date: {
            type: Date,
        },
        age: {
            type: Number,
        }
    },
    phone: {
        type: String,
        trim: true
    },
    cell: {
        type: String,
        trim: true
    },
    identification: {
        name: {
            type: String,
            trim: true
        },
        value: {
            type: String,
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
        trim: true
    },
    password: {
        type: String,
    }
});

// 'Pre-hook' that will run prior to record being saved; incoming password hashed 10x and stored back to User object
UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

// Helper function which compares plain text password and hashed password
UserSchema.methods.isValidPassword = async function(encryptedPassword) {
    const user = this;
    const compare = await bcrypt.compare(encryptedPassword, user.password);
    return compare;
}

mongoose.model('users', UserSchema)
// const UserModel = mongoose.model('users', UserSchema);

// module.exports = UserModel;