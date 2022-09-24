import {
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { CircularProgress, Box, Typography } from "@mui/material";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkDoc = async () => {
      const linkCollection = collection(db, "links");
      const linkDoc = doc(linkCollection, shortCode);
      const getLink = await getDoc(linkDoc);

      if (getLink.exists()) {
        const { longURL, linkID, userUid } = getLink.data();
        const usersCollection = collection(db, "users", userUid, "links");
        const link = doc(usersCollection, linkID);
        await updateDoc(link, {
          totalClicks: increment(1),
        });

        window.location.href = longURL;
      } else {
        setLoading(false);
      }
    };
    fetchLinkDoc();
  }, []);

  if (loading)
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
        <Typography>Redirecting to the link</Typography>
      </Box>
    );
  else
    return (
      <Box mt={10} textAlign="center">
        <Typography>Link is invalid</Typography>
      </Box>
    );
};

export default LinkRedirect;
