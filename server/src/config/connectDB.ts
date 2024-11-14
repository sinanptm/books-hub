import { connect } from 'mongoose';
import { MONGODB_URL } from '.';

export default async function connectDb() {
    try {
        await connect(MONGODB_URL!);
    } catch (error) {
        console.log(error);
    }
}