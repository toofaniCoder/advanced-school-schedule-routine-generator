import {
  Button,
  Card,
  Stack,
  TextField,
  Fab,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, FieldArrayItem } from "houseform";
import { useState, useEffect, useRef } from "react";

const ClassCard = ({ index, remove, routine }) => {
  const formArrayRef = useRef(null);
  const [periodDay, setPeriodDay] = useState("Mon");

  // useEffect(() => {
  //   formArrayRef.current.add({
  //     day:periodDay,
  //     number: "",
  //     subject: "",
  //     teacher: "",
  //   });
  // }, []);
  const addPeriod = () => {
    formArrayRef.current.add({
      day: periodDay,
      number: "",
      subject: "",
      teacher: "",
    });
  };
  return (
    <Card sx={{ p: 4, position: "relative", overflow: "visible" }}>
      <Stack direction="row" justifyContent={"space-between"}>
        <FieldArrayItem name={`routine[${index}].standard`}>
          {({ value, setValue }) => (
            <TextField
              size="small"
              placeholder="Enter Your Class Number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </FieldArrayItem>

        <ToggleButtonGroup
          value={periodDay}
          onChange={(e, v) => v && setPeriodDay(v)}
          exclusive
        >
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <ToggleButton value={day} key={day}>
              {day}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button onClick={addPeriod} variant="contained" color="inherit">
          add a period
        </Button>
      </Stack>
      <Fab
        disabled={index === 0}
        size="small"
        color="error"
        sx={{ position: "absolute", top: -15, right: -15 }}
        onClick={remove}
      >
        <CloseIcon />
      </Fab>

      <Paper sx={{ bgcolor: "grey.900", p: 2, mt: 2 }}>
        <FieldArray
          ref={formArrayRef}
          name={`routine[${index}].periods`}
          initialValue={routine.periods}
        >
          {({ value, remove }) => (
            <Stack spacing={2}>
              {value.map((period, i) => period.day === periodDay ?  (
                <Stack
                  direction="row"
                  sx={{ "&>*": { flex: 4 } }}
                  columnGap={3}
                  key={`period-${i}`}
                >
                  <FieldArrayItem
                    name={`routine[${index}].periods[${i}].day`}
                    key={`period-day-${i}`}
                  >
                    {({ value, setValue }) => (
                      <input hidden
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                  </FieldArrayItem>
                  <FieldArrayItem
                    name={`routine[${index}].periods[${i}].number`}
                    key={`period-number-${i}`}
                  >
                    {({ value, setValue }) => (
                      <TextField
                        placeholder="Enter the Period Number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                  </FieldArrayItem>
                  <FieldArrayItem
                    name={`routine[${index}].periods[${i}].subject`}
                    key={`period-subject-${i}`}
                  >
                    {({ value, setValue }) => (
                      <TextField
                        placeholder="Enter the Subject Teacher"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                  </FieldArrayItem>
                  <FieldArrayItem
                    name={`routine[${index}].periods[${i}].teacher`}
                    key={`period-teacher-${i}`}
                  >
                    {({ value, setValue }) => (
                      <TextField
                        placeholder="Enter the Teacher Name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    )}
                  </FieldArrayItem>

                  <Button
                    disabled={i == 0}
                    onClick={() => remove(i)}
                    color="error"
                    variant="contained"
                    sx={{ flex: 0.5 }}
                  >
                    {" "}
                    <CloseIcon />
                  </Button>
                </Stack>
              ) : null)}
            </Stack>
          )}
        </FieldArray>
      </Paper>
    </Card>
  );
};

export default ClassCard;
