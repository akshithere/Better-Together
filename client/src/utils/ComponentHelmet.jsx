import { Helmet } from "react-helmet-async";

function ComponentHelmet({ type }) {
  return type == "Clubs" ? (
    <Helmet>
      <title>Better-Together | {type}</title>
      <meta
        name="description"
        content="Here is the clubs page of Better-Together where we help you to find the right NGO for your needs.."
      />
    </Helmet>
  ) : type == "Events" ? (
    <Helmet>
      <title>Better-Together | Events </title>
      <meta
        name="description"
        content="Here is the Events page of Better-Together where we help you to find the right NGO for your needs."
      />
      <link rel="canonical" href="/" />
    </Helmet>
  ) : null;
}

export default ComponentHelmet;
