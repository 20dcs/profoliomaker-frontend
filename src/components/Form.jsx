/* eslint-disable array-callback-return */
import React from "react";
import Project from "./Project";
import { NavLink } from "react-router-dom";
import {
  ChakraProvider,
  Text,
  Input,
  Grid,
  Textarea,
  Heading,
  FormControl,
  FormErrorMessage,
  Button,
  Code,
  useClipboard,
  useToast,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { ChromePicker } from "react-color";
import { EditIcon } from "@chakra-ui/icons";

// "Contact": {
//   "Email": "johndoe@gmail.com",
//   "Github": "https://github.com/johndoe",
//   "Twitter": "https://twitter.com/johndoe",
//   "LinkedIn": "https://linkedin.com/johndoe"
// }
const Form = ({user,jsonObj}) => {
  const hostedUrl=process.env.REACT_APP_HOSTED_URL_LINK;
  // const { colorMode, toggleColorMode } = useColorMode();
  const [socialPlatforms, setSocialPlatforms] = useState({ Email: "" });
  const [colorPicker, setColorPicker] = useState({
    background: "#FF5733",
  });

  const [initialSocialName, setInitialValue] = useState("");

  const toast = useToast();

  const handlePlatformNameSubmit = (newSocialName) => {
    const { [initialSocialName]: _, ...updatedPlatforms } = socialPlatforms;
    updatedPlatforms[newSocialName] = socialPlatforms[initialSocialName];

    setSocialPlatforms(updatedPlatforms);
  };

  const handlePlatformLinkChange = (key, event) => {
    const { value } = event.target;
    let updatedSocialPlatforms = { ...socialPlatforms };
    updatedSocialPlatforms[key] = value;
    setSocialPlatforms(updatedSocialPlatforms);
  };

  const handleAddPlatform = () => {
    const newKey = `Social ${Object.keys(socialPlatforms).length}`;
    setSocialPlatforms((prevPlatforms) => ({
      ...prevPlatforms,
      [newKey]: "",
    }));
  };

  const handleRemovePlatform = (key) => {
    const { [key]: _, ...updatedPlatforms } = socialPlatforms;
    setSocialPlatforms(updatedPlatforms);
  };

  const [numberOfProjects, setNumberOfProjects] = useState(1);
  const [data, setData] = useState();
  const { onCopy, setValue, hasCopied } = useClipboard("");
  let technologies = [
    {
      label: "Skills",
      options: [
        { value: "ReactJS", label: "ReactJS" },
        { value: "Adobe Creative Suite", label: "Adobe Creative Suite" },
        { value: "Lighting Techniques", label: "Lighting Techniques" },
        { value: "Creative Writing", label: "Creative Writing" },
        { value: "Social Media Analytics", label: "Social Media Analytics" },
        { value: "Final Cut Pro", label: "Final Cut Pro" },
        { value: "Agile Methodology", label: "Agile Methodology" },
        { value: "Persuasion Techniques", label: "Persuasion Techniques" },
        { value: "SEO Optimization", label: "SEO Optimization" },
        { value: "Conflict Resolution", label: "Conflict Resolution" },
        { value: "Financial Analysis", label: "Financial Analysis" },
        { value: "Data Visualization", label: "Data Visualization" },
        { value: "Java", label: "Java" },
        { value: "Product Roadmapping", label: "Product Roadmapping" },
        { value: "Employee Relations", label: "Employee Relations" },
        { value: "Email Marketing", label: "Email Marketing" },
        { value: "Content Strategy", label: "Content Strategy" },
        { value: "Budget Management", label: "Budget Management" },
        { value: "Wireframing", label: "Wireframing" },
        { value: "Curriculum Development", label: "Curriculum Development" },
        { value: "Contract Drafting", label: "Contract Drafting" },
        { value: "Medical Diagnosis", label: "Medical Diagnosis" },
        { value: "Mechanical Engineering", label: "Mechanical Engineering" },
        { value: "Culinary Arts", label: "Culinary Arts" },
        { value: "AutoCAD", label: "AutoCAD" },
        {
          value: "Business Process Mapping",
          label: "Business Process Mapping",
        },
        { value: "Forecasting", label: "Forecasting" },
        { value: "Business Development", label: "Business Development" },
        { value: "Fitness Programming", label: "Fitness Programming" },
        { value: "Painting Techniques", label: "Painting Techniques" },
        { value: "Music Production", label: "Music Production" },
        { value: "Pattern Making", label: "Pattern Making" },
        { value: "SEO Copywriting", label: "SEO Copywriting" },
        { value: "Crisis Management", label: "Crisis Management" },
        { value: "Property Valuation", label: "Property Valuation" },
        { value: "Resource Allocation", label: "Resource Allocation" },
      ],
    },
  ];

  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      // name: 'Spiderman',
    },
  });

  function handleAdd() {
    setNumberOfProjects(numberOfProjects + 1);
  }
  async function onSubmit(values) {
    console.log("form", values);

    let updatedData = {
      Color: colorPicker.background ?? "#00FFFF",
      Head: {
        title: values?.name ?? "Jhon Doe | Frontend Developer & Designer",
        NavbarName: values?.name ?? "Jhon Doe",
      },
      HomePage: {
        name: values?.name ?? "Jhon Doe",
        Position: [
          values?.position1,
          values?.position2,
          values?.position3,
          values?.position4,
        ],
        description:
          values?.bio ??
          "I design and build websites that look good, and work well.",
      },
      AboutPage: {
        AboutParagraph:
          values?.description ??
          "I am a frontend developer and designer with a passion for creating beautiful and user-friendly websites and applications. I have a strong background in both web development and graphic design, and I enjoy using my skills to create stunning websites and interfaces that are easy to use and navigate.In my previous work, I have designed and developed websites for a variety of clients, including small businesses, non-profit organizations, and large corporations. I have also created mobile applications and responsive websites that are compatible with a variety of devices and screen sizes. My goal is always to create websites and applications that are visually appealing and user-friendly, and I believe that my skills and experience make me an excellent frontend developer and designer.",
        ImageLink:
          values?.imgLink ??
          "https://cdn.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.webp",
      },

      Skills: ["Html", "Bootstrap", "Figma"],
      Projects: [
        {
          title: values?.projectTitle1 ?? "Reports",
          ImageLink: values?.projectImgLink1 ?? "",
          Status: values?.name ?? "Completed",
          ProjectName: values?.name ?? "Reports",
          Technologies: ["HTML", "TAILWIND", "REACT", "NEXT"],
          Description:
            values?.projectDescription1 ??
            "Write reports for your students in 60 seconds or less",
          DemoLink: values?.projectLink1 ?? "",
        },
      ],
      Contact: socialPlatforms,
    };

    if (values?.skills) {
      let tempArray = [];
      values.skills.forEach((s) => tempArray.push(s?.value));
      updatedData.Skills = tempArray;
    }

    if (numberOfProjects > 0) {
      let tempArray = [];

      [...Array(numberOfProjects)].map((e, index) => {
        let proj = {
          title: values[`projectTitle${index}`] ?? "Reports",
          ImageLink: values[`projectImgLink${index}`] ?? "",
          Status: values[`projectStatus${index}`]?.value ?? "Completed",
          ProjectName: values[`projectTitle${index}`] ?? "Reports",
          Technologies: [],
          Description:
            values[`projectDescription${index}`] ??
            "Write reports for your students in 60 seconds or less",
          DemoLink: values[`projectLink${index}`] ?? "",
        };
        let tempTechArray = [];
        values[`project${index}`]?.forEach((s) => tempTechArray.push(s?.value));
        proj.Technologies = tempTechArray;
        tempArray.push(proj);
      });
      updatedData.Projects = tempArray;
    }
    console.log("data.json", updatedData);
    setData(updatedData);

    toast({
      title: "Code Generated.",
      description: "Your personalised data is ready.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    const newPerson = {data: updatedData };

    console.log("newPerson", newPerson);
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/userdata/adddata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        Color: newPerson.data.Color,
        Head: newPerson.data.Head,
        HomePage: newPerson.data.HomePage,
        AboutPage: newPerson.data.AboutPage,
        Skills: newPerson.data.Skills,
        Projects: newPerson.data.Projects,
        Contact: newPerson.data.Contact,
      }),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }
  return (
    <ChakraProvider resetCSS>
      <Heading
        fontFamily="'Poppins', sans-serif;"
        textAlign="center"
        my={5}
        as="h2"
        size="xl"
      >
        Personalised Portfolio Generator Form
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors}>
          <Grid
            className={"Form"}
            id="intro"
            paddingY={"4vh"}
            templateColumns="repeat(1, 1fr)"
            gap={4}
            marginX={"auto"}
            marginTop={"4%"}
            maxW={"80%"}
          >
            <Heading>Introduction</Heading>
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              <div
                className="App"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div>
                  <Text fontWeight={"bold"} width="20vh">
                    Choose theme color for the website:
                  </Text>
                  <div className="sketchpicker">
                    <ChromePicker
                      id="color"
                      name="color"
                      onChange={({ hex }) => {
                        setColorPicker({ background: hex });
                      }}
                      color={colorPicker.background}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              <Text fontWeight={"bold"} width="20vh">
                Your good name
              </Text>
              <Input
                id="name"
                name="name"
                {...register("name", {
                  required: "This is required",
                })}
                isInvalid={errors?.name ? true : false}
                placeholder="Peter Parker"
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </Grid>
            <Grid templateColumns="repeat(5, 1fr)" gap={1}>
              <Text fontWeight={"bold"} width="20vh">
                What do you do
              </Text>
              <Input
                id="Position 1"
                name="Position 1"
                variant="flushed"
                {...register("position1", {
                  required: "This is required",
                })}
                isInvalid={errors?.position1 ? true : false}
                placeholder="Software Engineer"
              />
              <Input
                id="Position 2"
                name="Position 2"
                variant="flushed"
                {...register("position2", {
                  // required: 'This is required',
                })}
                isInvalid={errors?.position2 ? true : false}
                placeholder="Photographer"
              />
              <Input
                id="Position 3"
                name="Position 3"
                variant="flushed"
                {...register("position3", {
                  // required: 'This is required',
                })}
                isInvalid={errors?.position3 ? true : false}
                placeholder="Graphic Designer"
              />
              <Input
                id="Position 4"
                name="Position 4"
                variant="flushed"
                {...register("position4", {
                  // required: 'This is required',
                })}
                isInvalid={errors?.position4 ? true : false}
                placeholder="Footballer"
              />
            </Grid>
            <Grid templateColumns="repeat(5, 1fr)" gap={14}>
              <Text fontWeight={"bold"} width="20vh">
                Single line Bio
              </Text>
              <Input
                placeholder="I am secretly spiderman"
                id="bio"
                name="bio"
                {...register("bio", {
                  // required: 'This is required',
                })}
                isInvalid={errors?.bio ? true : false}
                width="64vh"
                size="md"
                display="block"
              />
            </Grid>
            <Grid templateColumns="repeat(1 1fr)" gap={2}>
              <Text fontWeight={"bold"} width="20vh">
                More about you
              </Text>
              <Textarea
                id="description"
                name="description"
                {...register("description", {
                  // // required: 'This is required',
                })}
                isInvalid={errors?.description ? true : false}
                size="md"
                placeholder="I am a frontend developer and designer with a passion for creating beautiful and user-friendly websites and applications. I have a strong background in both web development and graphic design, and I enjoy using my skills to create stunning websites and interfaces that are easy to use and navigate."
                minWidth="30vh"
                minHeight="16vh"
              />
              <Grid templateColumns="repeat(5, 1fr)" gap={14}>
                <Text fontWeight={"bold"} width="20vh">
                  {"Your display Image Link"}
                </Text>
                <Input
                  id="imgLink"
                  name="imgLink"
                  {...register("imgLink", {
                    // // required: 'This is required',
                  })}
                  isInvalid={errors?.imgLink ? true : false}
                  placeholder="https://cdn.vectorstock.com/i/1000x1000/23/81/default-avatar-profile-icon-vector-18942381.webp"
                  width="80vh"
                  size="sm"
                  display="block"
                />
              </Grid>
            </Grid>

            <Grid templateColumns="repeat(5, 1fr)" gap={14}>
              <Text fontWeight={"bold"} width="20vh">
                Skills:
              </Text>

              <Controller
                control={control}
                id="skills"
                name="skills"
                // rules={{ required: 'Please enter at least one food group.' }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => (
                  <FormControl
                    width="80vh"
                    textColor="black"
                    isInvalid={!!error}
                    id={"skills"}
                  >
                    <CreatableSelect
                      menuPortalTarget={document.body}
                      classNamePrefix="chakra-react-select"
                      isMulti
                      name={name}
                      ref={ref}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      options={technologies}
                      // colorScheme={'pink'}
                      placeholder="Select Skills"
                      closeMenuOnSelect={false}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            className={"Form"}
            id="socials"
            paddingY={"4vh"}
            templateColumns="repeat(1, 1fr)"
            gap={4}
            marginX={"auto"}
            marginTop={"4%"}
            maxW={"80%"}
          >
            <Heading>Socials</Heading>
            <Alert status="info" maxW={"-webkit-max-content"}>
              <AlertIcon />
              You can click on title of 'social' to edit it, try clicking on
              Email
            </Alert>
            <EditIcon />
            <Grid>
              {Object.keys(socialPlatforms).map((socialName, index) => (
                <div key={`social${socialName}`}>
                  <Grid templateColumns="repeat(3, 2fr)" gap={5}>
                    <Editable
                      defaultValue={socialName}
                      marginY={5}
                      onSubmit={handlePlatformNameSubmit}
                      onEdit={() => setInitialValue(socialName)}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>

                    <Input
                      type="text"
                      name="link"
                      key={`link${socialName}`}
                      placeholder="Platform link"
                      value={socialPlatforms[socialName]}
                      onChange={(event) =>
                        handlePlatformLinkChange(socialName, event)
                      }
                      // width="50vh"
                      size="md"
                      marginY={5}
                      isInvalid={false}
                    />
                    {socialName !== "Email" && (
                      <Button
                        colorScheme="gray"
                        size="md"
                        type="button"
                        onClick={() => handleRemovePlatform(socialName)}
                        marginY={5}
                        fontSize={15}
                      >
                        Remove
                      </Button>
                    )}
                  </Grid>
                </div>
              ))}
              <Flex direction="row" align="center">
                <Button
                  colorScheme="teal"
                  size="md"
                  onClick={handleAddPlatform}
                >
                  Add Social Platform
                </Button>
              </Flex>
            </Grid>
            <Grid
              id="projects"
              paddingY={"4vh"}
              marginBottom={"8vh"}
              templateColumns="repeat(1, 1fr)"
              gap={14}
              display="grid"
            >
              <Heading>Projects</Heading>

              {
                // Looping same component numberOfProjects times
                [...Array(numberOfProjects)].map((e, index) => (
                  <Project
                    key={index}
                    register={register}
                    errors={errors}
                    control={control}
                    technologies={technologies}
                    id={index}
                  />
                ))
              }
              <Button
                width={128}
                marginX={"auto"}
                marginTop={"4px"}
                bgColor={"#1A202C"}
                color={"#EDF2F7"}
                borderRadius={"6px"}
                _hover={{
                  color: "#1A202C",
                  bgColor: "#A0AEC0",
                }}
                onClick={() => handleAdd()}
              >
                Add Project
              </Button>
            </Grid>
            <Button
              width={200}
              marginX={"auto"}
              marginTop={-30}
              bgColor={"#0A7CC9"}
              color={"white"}
              isLoading={isSubmitting}
              borderRadius={"6px"}
              _hover={{
                color: "#000000",
                bgColor: "#5DB7F4",
              }}
              type="submit"
            >
              Submit
            </Button>
            {(jsonObj?.length !== 0) && <NavLink target="_blank" style={{display: "flex"}} to={`${hostedUrl}/${user.username}`} >
            <Button
              width={200}
              marginX={"auto"}
              marginTop={2}
              bgColor={"#38A169"}
              color={"white"}
              // isLoading={isSubmitting}
              borderRadius={"6px"}
              _hover={{
                color: "#000000",
                bgColor: "#5DB7F4",
              }}
              
            >
              Open Portfolio
            </Button>
            </NavLink>}
          </Grid>
        </FormControl>
      </form>
      
      {data && (
        <Grid
          paddingBottom={"4vh"}
          templateColumns="repeat(1, 1fr)"
          marginX={"auto"}
          marginTop={"4%"}
          maxW={"100%"}
        >
          <Code
            marginX={"auto"}
            height={"100vh"}
            width={"100vh"}
            overflow={"scroll"}
          >
            <Button
              bgColor={"gray.400"}
              color={"white"}
              // isLoading={isSubmitting}
              borderRadius={"6px"}
              _hover={{
                color: "black",
              }}
              float={"right"}
              margin={"4px"}
              onClick={() => {
                setValue(JSON.stringify(data));
                onCopy();
              }}
            >
              {hasCopied ? "Copied!" : "Copy"}
            </Button>

            <pre style={{ margin: "16px" }}>
              {JSON.stringify(data, null, 2)}{" "}
            </pre>
          </Code>
        </Grid>
      )}
    </ChakraProvider>
  );
};

export default Form;
