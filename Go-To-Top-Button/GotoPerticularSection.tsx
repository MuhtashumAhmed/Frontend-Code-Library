// ======= if want to scroll any perticular section using section id 
// === id cahnge krni hogi har form ke liyee
"use client"
export const handleGoToForm = () => {

    const section = document.getElementById("book-a-site-visit")
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
}