import React from "react";
import { Chart } from "./chart";
import {
  Box,
  Grid,
  Backdrop,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";

export const ViewDota = (props) => {
  const { datas, handleChange, handleChangeTeam, submitMatchId } = props;

  const { data, matchId, team, isLoading } = datas;
  const { lineup, team_info, win_rate, predict } = data || {};
  const charts = win_rate ? Object.keys(win_rate) : null;

  const imgTeamSelect = team_info
    ? team === 1
      ? team_info.team1.logoURL
      : team_info.team2.logoURL
    : "";

  return (
    <Box>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container direction="column" wrap="nowrap">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "15%",
            paddingRight: "15%",
            paddingTop: "5%",
          }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">
              Match ID
            </InputLabel>
            <OutlinedInput
              id="match-id"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  https://hawk.live/matches/
                </InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <Button
            disabled={isLoading}
            onClick={() => submitMatchId(matchId)}
            style={{
              marginTop: "3%",
              marginRight: "15%",
              marginLeft: "15%",
              marginBottom: "3%",
            }}
            variant="contained"
            color="primary"
          >
            ANALYZE
          </Button>
        </div>
        {!!imgTeamSelect && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              alt={1}
              src={imgTeamSelect}
            />
            <p>{predict}</p>
          </div>
        )}
        <div
          style={{
            marginRight: "15%",
            marginLeft: "15%",
            marginBottom: "3%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel id="team">Select Team</InputLabel>
          <select className="select" style={{
            height: '50px'
          }} id="team" value={team} onChange={() => handleChangeTeam}>
            <option value={1}>
              {team_info && team_info.team1 && team_info.team1.name}
            </option>
            <option value={2}>
              {team_info && team_info.team2 && team_info.team2.name}
            </option>
          </select>
        </div>

        {lineup && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {lineup[team === 1 ? "team1" : "team2"].map((itemTeam) => {
              return (
                <img
                  alt={itemTeam.name}
                  src={itemTeam.image}
                  style={{
                    width: "50px",
                    height: "50px",
                    margin: "5px",
                    objectFit: "cover",
                  }}
                />
              );
            })}
          </div>
        )}

        <Grid
          item
          container
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {charts &&
            charts.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={5}
                  style={{
                    height: "400px",
                    margin: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Chart data={win_rate && win_rate[item]}></Chart>
                  <p>{item}</p>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
};
