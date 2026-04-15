import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQs = () => {
  return (
    <Accordion type="single" collapsible className="grid gap-5 ">
      {dataFaqs?.map((faq, i) => (
        <AccordionItem
          value={`item-${i}`}
          key={i}
          className="border border-myBrown rounded px-4 text-myBlack font-raleway text-base last:border-b border-b"
        >
          <AccordionTrigger className="border-none">
            {faq.question}
          </AccordionTrigger>

          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const dataFaqs = [
  {
    question: "Can I book a workspace for just a few hours or a single day?",
    answer:
      "Absolutely. You can book our coworking space for a full day or on an hourly basis. Just get in touch with us today to check availability for immediate use!",
  },
  {
    question:
      "What is the difference between a Shared Desk and a Private Room?",
    answer:
      "A Shared Desk is perfect for freelancers or remote workers who enjoy a professional, open environment. A Private Room (Small or Large) is an enclosed, sound-controlled space designed for focused work, confidential calls, or clinical/administrative tasks.",
  },
  {
    question: "Are there options for long-term teams or dedicated desks?",
    answer:
      "Absolutely. For those looking for a more permanent home base, we offer Dedicated Desks and Team Spaces. These plans can be customized with specific access schedules and office layouts to fit your growing business.",
  },
  {
    question: "Where is the facility located?",
    answer:
      "We are conveniently located at 2E Rollins Road, Round Lake Beach, IL, 60073. Our road-facing location offers easy access for professionals across Lake County and Northern Illinois.",
  },
];
