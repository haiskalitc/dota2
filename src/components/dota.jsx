import React, { useState } from "react";

import { ViewDota } from "./view";

import Swal from "sweetalert2";

export const Dota = () => {
  const [data, setData] = useState({
    data: null,
    matchId: "",
    teamCurrent: "",
    team: 1,
    isLoading: false,
  });

  return (
    <ViewDota
      datas={data}
      handleChangeTeam={(team) => {
        setData({
          team: team && team.target.value,
        });
      }}
      submitMatchId={(value) => {
        if (!!value) {
          setData({
            isLoading: true,
          });
          fetch(
            `https://api-betting.brickmate.kr/api/v1/analyze?matchId=${value}`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.error) {
                setData({
                  data: null,
                  team: 1,
                  isLoading: false,
                });
                Swal.fire({
                  icon: "error",
                  title: "",
                  text: "Data not found!!!",
                  allowOutsideClick: false,
                });
              } else {
                setData({
                  data: data,
                  team: 1,
                  isLoading: false,
                });
                Swal.fire("", "All in thâu!", "success");
              }
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "",
            text: "Match ID not found!!!",
            allowOutsideClick: false,
          });
        }
        console.clear();
      }}
      handleChange={(data) => {
        setData({
          matchId: data && data.target.value,
        });
      }}
    ></ViewDota>
  );
};
