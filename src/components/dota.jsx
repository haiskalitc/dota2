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
    const charts = [...data.enemies, { name: 'total', rate: data.total }];

    return (
      charts && (
        <ResponsiveContainer width="100%" height="120%">
          <ComposedChart
            layout="vertical"
            data={charts}
            margin={{
              left: 70,
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
            <Bar dataKey="rate" radius={[0, 20, 20, 0]} barSize={10}>
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
              <LabelList dataKey="rate" position="top" />
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
      fetch(`https://api-betting.brickmate.kr/api/v2/analyze?matchId=${value}`)
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

          <Grid
            item
            container
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {['team1', 1, 'team2'].map((t) => {
              return t === 1 ? (
                <Grid key={t} item xs={2}>
                  {!!predict && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        fontSize: '20px'
                      }}
                    >
                      {predict['team1'] > predict['team2']
                        ? `Chọn ${team_info['team1'].name}`
                        : `Chọn ${team_info['team2'].name}`}
                    </div>
                  )}
                </Grid>
              ) : (
                <Grid key={t} item xs={5}>
                  {!!team_info && (
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
                        src={team_info[t].logoURL}
                      />
                      <p>{team_info[t].name}</p>
                      <p>{predict[t]}</p>
                    </div>
                  )}

                  {lineup && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {lineup[t].map((itemTeam, indexTeam) => {
                        return (
                          <img
                            alt={itemTeam.name}
                            src={itemTeam.image}
                            key={indexTeam + 'xxx'}
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
                      marginTop: '10pxs',
                    }}
                  >
                    {win_rate &&
                      win_rate[t].map((item, index) => {
                        return (
                          <Grid
                            key={index}
                            item
                            xs={10}
                            style={{
                              height: '400px',
                              margin: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            {this.MelonMostChart(item)}
                            <img
                              alt={item && item.name}
                              width="50px"
                              height="50px"
                              style={{
                                objectFit: 'cover',
                              }}
                              src={item && item.image}
                            />
                            <p
                              style={{
                                marginTop: '0px',
                              }}
                            >
                              {item && item.name}
                            </p>
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          {/* <div
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
          </div> */}
        </Grid>
      </Box>
    );
  }
}
export default Dota;
