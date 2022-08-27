import {
  Flex,
  Image,
  Link,
  Radio,
  Spinner,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";

import { ColorScheme, COLOR_SCHEME_PRESETS } from "../lib/colors";
import { Firehose } from "../lib/firehose";
import { useCalendarExport } from "../lib/gapi";

/** The footer on the bottom of the calendar. */
export function LeftFooter(props: {
  colorScheme: ColorScheme;
  firehose: Firehose;
}) {
  const { colorScheme, firehose } = props;
  const year = new Date().getFullYear();

  const [isExporting, setIsExporting] = useState(false);
  const onCalendarExport = useCalendarExport(
    firehose,
    () => setIsExporting(false),
    () => setIsExporting(false)
  );

  return (
    <Flex
      direction="column"
      align="center"
      gap={0.5}
      opacity={0.3}
      _hover={{ opacity: 1 }}
      transition="0.5s opacity"
    >
      <Flex gap={4}>
        Color scheme:
        {COLOR_SCHEME_PRESETS.map((scheme) => (
          <Radio
            key={scheme.name}
            isChecked={scheme.name === colorScheme.name}
            onChange={() => firehose.setColorScheme(scheme)}
          >
            {scheme.name}
          </Radio>
        ))}
      </Flex>
      <Tooltip
        label={isExporting ? "Loading..." : "Make sure popups are enabled!"}
      >
        {isExporting ? (
          <Spinner m={3} />
        ) : (
          <Image
            src="img/calendar-button.svg"
            alt="Export to Google Calendar"
            onClick={() => {
              setIsExporting(true);
              onCalendarExport();
            }}
            style={{ cursor: "pointer" }}
          />
        )}
      </Tooltip>
      <Text mt={2} fontSize="sm">
        Beta by{" "}
        <Link href="mailto:cjq@mit.edu" color="inherit">
          CJ Quines
        </Link>
        . Firehose &copy;{year}{" "}
        <Link href="mailto:edwardf@alum.mit.edu" color="inherit">
          Edward Fan
        </Link>
        .
      </Text>
      <Text fontSize="sm">
        Subject descriptions and evaluations &copy;{year} Massachusetts
        Institute of Technology.
      </Text>
    </Flex>
  );
}

/** The footer on the bottom of the activity description. */
export function RightFooter(props: { firehose: Firehose }) {
  const { firehose } = props;
  return (
    <Flex
      direction="column"
      align="center"
      gap={0.5}
      opacity={0.3}
      _hover={{ opacity: 1 }}
      transition="0.5s opacity"
    >
      <Text>Last updated: {firehose.lastUpdated}.</Text>
      <Text>
        Questions? Issues? Feedback?{" "}
        <Link href="mailto:cjq@mit.edu">Send me an email!</Link>
      </Text>
      <Text>
        Looking for the old Firehose? It's been moved{" "}
        <Link href="https://firehose.guide/old_www/evaluations.html">here</Link>
        .
      </Text>
      <Flex gap={4}>
        <Link href="https://github.com/edfan/firehose">GitHub</Link>
        <Link href="privacy.html">Privacy Policy</Link>
      </Flex>
    </Flex>
  );
}