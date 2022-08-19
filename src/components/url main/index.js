import React, { useState, useEffect } from "react";
import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UrlMain() {
    //const [data, setData] = useState("")
    const [input, setInput] = useState({
        user: [],
        fullUrl: ""
    })
    //console.log(input)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/shortUrls", { fullUrl: input.fullUrl });
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const res = async () => {
            let resp = await axios.get("http://localhost:8080/get");
            setInput({ ...input, user: resp.data})
        }
        res();
    }, [input.fullUrl]);

    return (
        <div className="main">
            <div className="heading">

                <div className="home">
                    <h1>URL Shortener</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <input required type="url" placeholder="Paste a full url link to shorten it"
                        name="fullUrl" class="form-control w-60" 
                        value={input.fullUrl} 
                        onChange={(e) => setInput({ ...input, fullUrl: e.target.value })} /><br />
                    <button type="submit" class="btn btn-success">Shrink</button>
                </form><br /><br />
                
                <div>
                    <table className="table table-striped table-bordered table-responsive" 
                    style={{ textAlign: "left", width: "70%" }}>
                        <thead>
                            <tr>
                                <th>Full URL</th>
                                <th>Short URL</th>
                                <th>Clicks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {input.user.map(ele => {
                                return (
                                    <tr key="ele._id">
                                        <td>
                                            <a href={ele.fullUrl} target="_blank">{ele.fullUrl}</a>
                                        </td>
                                        <td><a href={`http://localhost:8080/${ele.shortUrl}`} target="_blank">{ele.shortUrl}</a></td>
                                        <td>{ele.clicks}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div >
    )
}