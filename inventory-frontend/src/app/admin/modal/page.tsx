import { redirect } from "next/navigation";

//this page is just to redirect unintended path (i need to intercept path from /admin to open the modal)
//but i will create some query to 'scroll' it to the  exact scroll the item was.
export default function Page() {
    redirect('/admin')
}