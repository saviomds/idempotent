export const getServices = (req, res) => {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Build responsive and modern websites.",
    },
    {
      id: 2,
      title: "App Development",
      description: "Create mobile applications for Android and iOS.",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Design user-friendly interfaces and experiences.",
    },
    {
      id: 4,
      title: "SEO Services",
      description: "Optimize your website to rank higher in search engines.",
    },
    {
      id: 5,
      title: "Cloud Services",
      description: "Leverage cloud technology for better scalability.",
    },
  ];

  res.render("Services", { title: "Our Services", services });
};
