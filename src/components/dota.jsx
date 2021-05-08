import React, { Component } from 'react';
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
} from '@material-ui/core';

import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  YAxis,
  Cell,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';

import Swal from 'sweetalert2';

class Dota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      matchId: '',
      teamCurrent: '',
      team: 1,
      isLoading: false,
    };
  }

  MelonMostChart = (data) => {
    const temp = data && Object.keys(data);
    const charts = temp.map((item) => {
      return {
        name: item,
        perc: data[item],
      };
    });
    return (
      charts && (
        <ResponsiveContainer width="100%" height="120%">
          <ComposedChart
            layout="vertical"
            data={charts}
            margin={{
              left: 50,
              right: 80,
            }}
          >
            <CartesianGrid
              strokeDasharray="0"
              opacity={0.5}
              horizontal={true}
              stroke="#000000"
            />
            <Tooltip />
            <XAxis
              type="number"
              tick={{
                fontSize: 10,
                fill: '#000000',
                fontFamily: 'Montserrat',
              }}
              tickCount={10}
            />
            <YAxis
              tick={{
                fontSize: 15,
                fill: '#000000',
                fontFamily: 'Montserrat',
              }}
              axisLine={false}
              tickLine={false}
              dataKey="name"
              type="category"
            />
            <Bar dataKey="perc" radius={[0, 20, 20, 0]} barSize={10}>
              {charts.map((item, index) => {
                return (
                  <Cell
                    key={index + 69}
                    style={{
                      fill: item?.name === 'total' ? '#FF33B0' : '#9F4BE6',
                    }}
                  ></Cell>
                );
              })}
              <LabelList dataKey="perc" position="top" />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      )
    );
  };

  handleChange = (data) => {
    this.setState(() => {
      return {
        matchId: data && data.target.value,
      };
    });
  };

  handleChangeTeam = (team) => {
    this.setState(() => {
      return {
        team: team && team.target.value,
      };
    });
  };

  submitMatchId = (value) => {
    if (!!value) {
      this.setState(() => {
        return {
          isLoading: true,
        };
      });
      fetch(`https://api-betting.brickmate.kr/api/v1/analyze?matchId=${value}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.setState(() => {
              return {
                data: null,
                team: 1,
                isLoading: false,
              };
            });
            Swal.fire({
              icon: 'error',
              title: '',
              text: 'Data not found!!!',
              allowOutsideClick: false,
            });
          } else {
            this.setState(() => {
              return {
                data: data,
                team: 1,
                isLoading: false,
              };
            });
            Swal.fire('', 'All in thâu!', 'success');
          }
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: '',
        text: 'Match ID not found!!!',
        allowOutsideClick: false,
      });
    }
    console.clear();
  };

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  render() {
    const { data, matchId, team, isLoading } = this.state;
    const { lineup, team_info, win_rate, predict } = data || {};
    const charts = win_rate ? Object.keys(win_rate) : null;

    const imgTeamSelect = team_info
      ? team === '1'
        ? team_info.team1.logoURL
        : team_info.team2.logoURL
      : '';

    return (
      <Box>
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Grid container direction="column" wrap="nowrap">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '15%',
              paddingRight: '15%',
              paddingTop: '5%',
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Match ID
              </InputLabel>
              <OutlinedInput
                id="match-id"
                onChange={this.handleChange}
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
              onClick={() => this.submitMatchId(matchId)}
              style={{
                marginTop: '3%',
                marginRight: '15%',
                marginLeft: '15%',
                marginBottom: '3%',
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
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                }}
                alt={1}
                src={imgTeamSelect}
              />
              <p>{predict}</p>
            </div>
          )}
          <div
            style={{
              marginRight: '15%',
              marginLeft: '15%',
              marginBottom: '3%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InputLabel id="team">Select Team</InputLabel>
            <select
              className="select"
              style={{
                height: '50px',
              }}
              id="team"
              value={+team}
              onChange={this.handleChangeTeam}
            >
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {lineup[team === '1' ? 'team1' : 'team2'].map((itemTeam) => {
                return (
                  <img
                    alt={itemTeam.name}
                    src={itemTeam.image}
                    style={{
                      width: '50px',
                      height: '50px',
                      margin: '5px',
                      objectFit: 'cover',
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
              display: 'flex',
              justifyContent: 'center',
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
                      height: '400px',
                      margin: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    {this.MelonMostChart(win_rate && win_rate[item])}
                    <p>{item}</p>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
export default Dota;
