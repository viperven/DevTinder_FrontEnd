import React, { useEffect } from "react";
import { DataService } from "../../services/DataSerivce";
import { AuthService } from "../../services/AuthService";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { storeConnection } from "../../utils/connectionSlice";

function Connection() {
    const userConnections = useSelector((state) => state?.connection);
    const loggedInUserId =  useSelector((state) => state.user._id); 

    const disPatch = useDispatch();
    const navigate = useNavigate();

    const getConnectionData = async () => {
        try {
            if (userConnections && userConnections.length > 0) {
                return;
            }
            const data = await DataService.getConnectionData();
            if (data?.isSuccess) {
                disPatch(storeConnection(data?.apiData));
            }
        } catch (error) {
            //   console.log(error);
        }
    };


    useEffect(() => {
        if (!AuthService.isAuthenticatedUser()) {
            navigate("/login");
            return;
        }
        getConnectionData();
    }, []);



    return (
        <Layout>
            <div className="grid grid-cols-2 gap-4 p-4">
                {userConnections &&
                    userConnections.map((connection) => {
                        // Determine the other user's details
                        const otherUser =
                            connection.senderID._id === loggedInUserId
                                ? connection.receiverID
                                : connection.senderID;

                        return (
                            <div key={connection._id} className="card card-side bg-base-100 shadow-xl">
                                <figure className="pl-3">
                                    <img
                                        src={otherUser.photoUrl}
                                        alt="profile image"
                                        className="h-28 w-32"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{otherUser.firstName}</h2>
                                    <p>{otherUser.summary}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>


        </Layout>
    );
}

export default Connection;
