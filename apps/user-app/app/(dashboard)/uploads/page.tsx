import Uploads from "@/components/Uploads";

const page = () => {
    return (
        <div>
            agya 
        </div>
    );
}

export default page;


declare module "next-auth" {

  interface Session {

    user: {

      id?: number

      name?: string | null

      email?: string | null

      image?: string | null

      phone?: string | null

      password?: string | null

    }

  }

}

interface File{
    path:string;
    size:number;
    uploaderName:string;
    name:string
    userId:number
}

interface Experience{
    company:string;
    position:string;
    description:string;
    startDate:string;
    endDate:string;
    userid:number;
}

interface Education{
    institution:string;
    degree:string;
    startDate:string;
    endDate:string;
    fieldOfStudy:string;
    userid:number;
    grade:string;
}

interface Projects{
    title:string;
    description:string;
    userId:number;
}

interface Skill{
    name:string;
    userId:number;
}

interface Credentials{
    bio :string;
    description:string;
    image:File[]
    experience:Experience[]
    education:Education[]
    projects:Projects[]
    skills:Skill[];
}
