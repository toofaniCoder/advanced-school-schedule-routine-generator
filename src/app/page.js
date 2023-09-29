"use client";
import {
  Button,
  Container,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ClassCard from "./components/class-card";
import { Form, FieldArray } from "houseform";
import { useEffect, useRef, useState } from "react";
import { routines } from "../../fake_routine";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { orange } from "@mui/material/colors";
import _ from "lodash";
import { saveAs } from "file-saver";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    // alignItems: "flex-start",
    backgroundColor: orange[50],
  },
  section: {
    margin: 10,
    padding: 10,
  },
  table_container: {
    margin: 10,
    padding: 10,
  },
  thead: {
    flexDirection: "row",
    // justifyContent: "space-around",
    // backgroundColor: "red",
    border: "1px solid #111",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  thead_text: {
    fontSize: 10,
  },
  tbody: {
    border: "1px solid #111",
    borderTop: 0,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  table_cell: {
    flex: 1,
    // justifyContent:"center",
    // backgroundColor:"red",
    textAlign: "center",
  },
});

// Create Document Component
const MyDocument = ({ routines }) => (
  <Document>
    {routines?.map((routine) => (
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text>Routine for Class - {routine.standard}</Text>
        </View>
        <View style={styles.table_container}>
          <View style={styles.thead}>
            {["Periods", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <View style={styles.table_cell}>
                  <Text style={styles.thead_text}>{day}</Text>
                </View>
              )
            )}
          </View>
          <View>
            {_.zip(...Object.values(_.groupBy(routine.periods, "day"))).map(
              (arr, index) => (
                <View
                  style={[styles.tbody, index == 7 ? styles.lastItem : null]}
                >
                  <View style={styles.table_cell}>
                    <Text style={{ fontSize: 10 }}>{index + 1} period</Text>
                  </View>
                  {arr.map((item, index, a) => (
                    <View style={styles.table_cell}>
                      <Text style={{ fontSize: 10 }}>{item.subject}</Text>
                      <Text style={{ fontSize: 8 }}>{item.teacher}</Text>
                    </View>
                  ))}
                </View>
              )
            )}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);
export default function Home() {
  const formRef = useRef(null);
  const formArrayRef = useRef(null);
  const [isDemoModeOn, setIsDemoModeOn] = useState(false);
  const addStandard = () => {
    formArrayRef.current.add({ standard: "", periods: [] });
  };


  return (
    <Container component={"main"} sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Button
          sx={{ alignSelf: "flex-start" }}
          variant="contained"
          onClick={addStandard}
        >
          Add a New Class
        </Button>

      
        <Form
          ref={formRef}
          onSubmit={async (values) => {
            console.log(values);
            const doc = <MyDocument routines={values.routine} />;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            saveAs(blob, "routine.pdf");
          }}
        >
          {({ submit }) => (
            <Stack
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              spacing={4}
            >
              <FieldArray
                ref={formArrayRef}
                name="routine"
                initialValue={[
                  // {
                  //   standard: "",
                  //   periods: [
                  //     // basic format
                  //     // {
                  //     //   number: "",
                  //     //   subject: "",
                  //     //   teacher: "",
                  //     // }
                  //   ],
                  // },
                  ...routines, 
                ]}
              >
                {({ value, remove }) => (
                  <>
                    {value.map((routine, index) => (
                      <ClassCard
                        routine={routine}
                        remove={() => remove(index)}
                        key={`routine-${index}`}
                        index={index}
                      />
                    ))}
                  </>
                )}
              </FieldArray>
              <Button type="submit" variant="contained" color="secondary">
                Generate PDF
              </Button>
            </Stack>
          )}
        </Form>
      </Stack>
    </Container>
  );
}
