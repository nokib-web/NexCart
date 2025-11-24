import { SignUp } from "@clerk/nextjs";


export default function Register() {
    return (
        <div className="flex items-center justify-center my-10 mx-auto">
            <SignUp
                path="/register"
                routing="path"
                signUpUrl="/login"
               
            />
        </div>
    );
}
