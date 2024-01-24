import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import demo from './logo.svg'
import Spinner from 'react-bootstrap/Spinner';
import "./style.css"
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Header from './Header';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function OpenAI() {
    const [input, setInput] = useState("")
    const [isShowValue, setIsShowValue] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);
    const [url, setUrl] = useState("");

    const LoadSpinner = () => {
        if (isSpinner) {
            return <Spinner animation="border" />
        }
    }

    const ShowData = async () => {
        setIsSpinner(true);
        // const response = await openai.images.generate({
        //     model: "dall-e-2",
        //     prompt: input,
        //     n: 1,
        //     size: "1024x1024",
        // });
        // const image_url = await response.data[0].url
        // setUrl(image_url)
        // setIsSpinner(false)
        // setIsShowValue(true)
        // console.log(image_url);
        axios.post("http://localhost:7000/openai", { data: input }).then((response) => {
            if (response.data.error) {
                toast.error(response.data.error)
            }
        })
            .catch((error) => {
                if (error.message) {
                    toast.error(error.message)
                }
                else if (error.request) {
                    toast.error("Server didnot respond")
                }
                else {
                    toast.error(error)
                }
            })

        // await setTimeout(() => {
        //     setIsSpinner(false)
        //     setIsShowValue(true)
        // }, 3000)

        await axios.get("http://localhost:7000/openai").then(async (response) => {
            if (response.data.error) {
                toast.error(response.data.error)
            }
            else {
                console.log(response.data.msg)
                setUrl(response.data.msg)
            }
        })
        .catch((error) => {
            if (error.message) {
                toast.error(error.message)
            }
            else if (error.request) {
                toast.error("Server didnot respond")
            }
            else {
                toast.error(error)
            }
        })
        setIsSpinner(false)
        setIsShowValue(true)


    }
    return (

        <div>
            <Header />
            <div >
                <div className="header">
                    <Badge bg="secondary"> <h1>Image Processing AI</h1></Badge>
                    <h5>Hi I am an Image Processing AI!</h5>
                    <p>You can ask me for images.</p>
                    <hr></hr>
                </div>
                <div className="main-container">
                    {
                        isSpinner ? (
                            <>
                                <h5>Loading your Image</h5>
                                <h4>{LoadSpinner()}</h4>
                                <Card style={{ width: '90rem', height: '10rem' }}>
                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation="glow">
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation="glow">
                                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>

                                    </Card.Body>
                                </Card>

                            </>
                        ) : (
                            <></>
                        )
                    }

                    {
                        isShowValue ? (
                            <>
                                <h4> Here is your image for </h4>
                                <h5>"{input}"</h5>
                                <hr></hr>
                                <div className="image-container">
                                    <img src={url} alt="Session time expired"></img>
                                </div>
                                <hr></hr>
                            </>
                        ) : (
                            <></>
                        )
                    }

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                        <Form.Control
                            placeholder="What Images do you want to see?"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={input}
                            onChange={(e) => { setInput(e.target.value) }}
                        />
                    </InputGroup>


                    <Button variant="info" onClick={() => ShowData()}>Get Image</Button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}
