import { connect } from "mongoose";
export const dbConnect = async(URI:string) => {
    try {
        await connect(URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    } catch (e) {
        console.error(e)
    }
    
};