// import {Schema,model,models} from 'mongoose';

// const UserSchema = new  Schema(
//     {
//         email:{
//         type:String,
//         unique : [true,'Email Already exists'], //if its not unique email exists
//         required : [true, 'Email is required'],    // if it fails email is required
//        },
//        username : {
//         type:String,
//         required:[true,'Username is required !'],
//         match: [/^[a-zA-Z0-9._]{8,20}$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
//         },
//         image:{
//             type:String,
//         }
//     }
// );

// const User = model("User",UserSchema)
// export default User; // Node js method


// const User = models.User || model("User",UserSchema) //checks if User model exists in models if not it creates a model 
// export default User; //  Nextjs method











import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: [true, 'Email Already exists'], //if its not unique email exists
            required: [true, 'Email is required'], // if it fails email is required
        },
        username: {
            type: String,
            required: [true, 'Username is required !'],
            match: [/^[a-zA-Z0-9._]{5,20}$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
        },
        image: {
            type: String,
        }
    }
);

UserSchema.index({ username: 1 }, { unique: true });

const User = models.User || model("User", UserSchema);
export default User;
