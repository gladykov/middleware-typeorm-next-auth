import {UserController} from "@/app/lib/user";

export default async function User() {
    const user = new UserController().verifyUser("393c3ea5-8576-4123-b8bf-d031e9219220")
    const result = (await user).error
    return (
        <div>

            {result}
            
        </div>
    )
}