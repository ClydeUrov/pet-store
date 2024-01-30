export const contactInformation = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    width: "380px",
    required: true,
  },
  {
    name: "phoneNumber",
    type: "text",
    label: "Phone Number",
    width: "380px",
    required: true,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    width: "380px",
    required: true,
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    width: "380px",
    required: true,
    disabled: true,
  },
];

export const delivery = [
  {
    name: "city",
    type: "text",
    label: "City Name",
    width: "380px",
    required: true,
  },
  {
    name: "postalCode",
    type: "text",
    label: "Postal Code",
    width: "380px",
    required: false,
  },
];

export const address = [
  {
    name: "street",
    type: "text",
    label: "Street name",
    width: "380px",
    required: true,
  },
  {
    name: "houseNumber",
    type: "text",
    label: "House Number",
    width: "170px",
    required: true,
  },
  {
    name: "apartment",
    type: "text",
    label: "Apartment",
    width: "170px",
    required: false,
  },
]

export const comment = {
    name: "comment",
    type: "textarea",
    label: "Comment",
    width: "780px",
    required: false,
  }