import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../firebase";
import { CircularProgress, Box, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

const LinkRedirect = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userUid = user.uid;
      let result;

      const fetchLinkDoc = async () => {
        const linkCollection = collection(db, "users", userUid, "links");
        const getLinks = await getDocs(linkCollection);

        const linkID = () => {
          return getLinks._snapshot.docChanges.map((doc) => {
            if (
              shortCode ===
              doc.doc.data.value.mapValue.fields.shortCode.stringValue
            ) {
              return (result = doc.doc.key.path.segments[8]);
            }
            return 0;
          });
        };
        linkID();

        const link = doc(linkCollection, result);
        const getLink = await getDoc(link);

        if (getLink.exists()) {
          const { longURL } = getLink.data();
          console.log(longURL);
          await updateDoc(link, {
            totalClicks: increment(1),
          });

          window.location.href = longURL;
        } else {
          setLoading(false);
        }
      };
      fetchLinkDoc();
    });
  }, [shortCode]);

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
