import React, { useState } from "react";
import "./App.css";
import {
  Container,
  Input,
  FormControl,
  InputAdornment,
  GridList,
  GridListTile,
  Snackbar,
} from "@material-ui/core";
import { Gif } from "@material-ui/icons";
import { useGiphySearch } from "./composables/useGiphySearch";
import { copyToClipboard } from "./utils/copyToClipboard";
import { Alert } from "./components/Alert";

function App() {
  const [query, setQuery] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const results = useGiphySearch(query);

  const copyUrl = (url: string) => {
    copyToClipboard(url);
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off">
          <FormControl fullWidth>
            <Input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Gif />
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
        <GridList cellHeight={160} cols={3}>
          {results.map((url) => (
            <GridListTile key={url} cols={1}>
              <video
                src={url}
                key={url}
                autoPlay
                loop
                onClick={(e) => copyUrl(url)}
              />
            </GridListTile>
          ))}
        </GridList>
      </Container>
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Gif URL copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
