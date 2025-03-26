import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
    const ollama = new Ollama({ host: "http://localhost:11434" });

    const body = await request.json();
    const chatMessage = body.chat || "";

    const user = {
        usertype: "Master User",
        school_id: "202211535",
        fullname: "Janzen T. Egnisaban",
        firstname: "Janzen",
        surname: "Egnisaban",
        middlename: "Tulipan",
        email: "202211535@gordoncollege.edu.ph",
        phone: "09683506258",
        birthday: "2003-11-02",
        age: 21,
        gender: "Male",
        nationality: "Filipino",
        address: {
            house_number: "#92",
            street: "Mabini St.",
            city: "Olongapo City",
            state: "Zambales",
            zip_code: "2200"
        },
        hobbies: ["running", "playing mobile legends"],
        academic_info: {
            course: "BSCS - Computer Science",
            year_level: "3rd Year",
            school: "Gordon College"
        },
        skills: {
            technical: ["AI Integration", "Programming", "Data Analysis"],
            soft_skills: ["Problem-Solving", "Teamwork", "Critical Thinking"]
        },
        things_i_like: ["chocolate", "chicken", "beef", "empanada", "beautiful things"],
        favorite_movies: ["Avengers"],
        favorite_games: ["Mobile Legends", "League of Legends"],
        social_media: {
            facebook: "https://www.facebook.com/aze.egnisaban",
            instagram: "https://www.instagram.com/azzzjnzn/"
        },
        emergency_contact: {
            name: "Eden Egnisaban",
            relationship: "Mother",
            phone: "09187575745"
        },
        mother: {
            name: "Eden Egnisaban",
            relationship: "Mother",
            phone: "09187575745"
        },
        father: {
            name: "Dino Egnisaban",
            relationship: "Father",
            about: "deceased"
        },
        brother: {
            name: "Jonas Egnisaban",
            relationship: "Brother",
            phone: "0945 332 8123"
        },
        blood_type: "O+",
        medical_conditions: "None",
        status: "In a relationship with Joshmine Totol",
        bestfriend: "Christian Dave Banluta",
        friends: "Anthony Alfred Almenario, Christine Joy Duazo, Christian Dave Banluta, Vaughn Gabriel Tinte",
    };

    const chat = await ollama.chat({
        model: "deepseek-r1:7b",
        messages: [
            {
                role: "system",
                content: `Here is the data of my user: ${JSON.stringify(user)}
                Respond only based on the data provided.`
            },
            {
                role: "user",
                content: chatMessage,
            },
        ],
    });

    return json(chat);
};
