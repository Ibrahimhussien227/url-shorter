import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import Navbar from "./Navbar";
import LinkCard from "./LinkCard";
import ShorterURLModal from "./ShorterURLModal";
import { auth, db } from "../../firebase";
import {
  collection,
  serverTimestamp,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import copy from "copy-to-clipboard";

const Account = () => {
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [newLinkCopied, setNewLinkCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [links, setLinks] = useState([]);

  const userUid = auth.currentUser.uid;
  const userCollection = useMemo(
    () => collection(db, "users", userUid, "links"),
    [userUid]
  );

  const handleCreateShorterLink = async (name, longURL) => {
    const link = {
      name,
      longURL:
        longURL.includes("http://") || longURL.includes("https://")
          ? longURL
          : `http://${longURL}`,
      createdAt: serverTimestamp(),
      shortCode: nanoid(6),
      totalClicks: 0,
    };

    const add = await addDoc(userCollection, link);

    setLinks((links) => [
      ...links,
      { ...link, createdAt: new Date(), id: add.id },
    ]);

    setOpenModal(false);
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const getData = await getDocs(userCollection);

      const tempLinks = [];
      getData.forEach((doc) =>
        tempLinks.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        })
      );
      setLinks(tempLinks);
      setTimeout(() => setFetchingLinks(false), 1000);
    };

    fetchLinks();
  }, [userCollection]);

  const handleDeleteLink = useCallback(
    async (linkDocID) => {
      if (window.confirm("Do you want delete this link?")) {
        await deleteDoc(doc(userCollection, linkDocID));
        setLinks((oldLinks) =>
          oldLinks.filter((link) => link.id !== linkDocID)
        );
      }
    },
    [userCollection]
  );

  const handleCopyLink = useCallback((shortUrl) => {
    copy(shortUrl);
    setNewLinkCopied(true);
  }, []);

  return (
    <>
      <Snackbar
        open={newLinkCopied}
        onClose={() => setNewLinkCopied(false)}
        autoHideDuration={2000}
        message="Link copied"
      />
      {openModal && (
        <ShorterURLModal
          createShorterLink={handleCreateShorterLink}
          handleClose={() => setOpenModal(false)}
        />
      )}
      <Navbar />
      <Box mt={{ xs: 3, sm: 5 }} p={{ xs: 2, sm: 0 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8}>
            <Box mb={5} display="flex">
              <Box mr={3}>
                <Typography variant="h4">Links</Typography>
              </Box>
              <Button
                onClick={() => setOpenModal(true)}
                disableElevation
                variant="contained"
                color="primary"
              >
                Create new
              </Button>
            </Box>
            {fetchingLinks ? (
              <Box textAlign="center">
                <CircularProgress />
              </Box>
            ) : !links.length ? (
              <Box textAlign="center">
                <img
                  style={{
                    width: "225px",
                    height: "auto",
                    marginBottom: "24px",
                  }}
                  src="/assets/no_data.svg"
                  alt="no data"
                />
                <Typography ml={7}>You have no links</Typography>
              </Box>
            ) : (
              links
                .sort(
                  (prevLink, nextLink) =>
                    nextLink.createdAt - prevLink.createdAt
                )
                .map((link, idx) => (
                  <Fragment key={link.id}>
                    <LinkCard
                      {...link}
                      deleteLink={handleDeleteLink}
                      copyLink={handleCopyLink}
                    />
                    {idx !== links.length - 1 && (
                      <Box my={4}>
                        <Divider />
                      </Box>
                    )}
                  </Fragment>
                ))
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Account;
