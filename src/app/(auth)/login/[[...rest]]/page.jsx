
import { SignIn } from "@clerk/nextjs";

export default function Login() {
    return (
        <div className="flex items-center justify-center my-10 mx-auto">
            <SignIn
                path="/login"
                routing="path"
                signUpUrl="/register"
               
            />
        </div>
    );
}

