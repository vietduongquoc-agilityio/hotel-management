import { Box, UnorderedList, ListItem, Text, Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";

// InterFace
import { NewRoomData } from "@/interfaces/Room";

// Constants
import {
  bedTypeOptions,
  roomFloorOptions,
  roomStatusColors,
  roomStatusOptions,
} from "@/constant/SelectOptions";

// Components
import AddRoomModal from "@/components/Modal/RoomModal/Add";

interface LabelRoomProps {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  onAddRoom: (roomData: NewRoomData) => Promise<void>;
  isAddRoom: boolean;
  selectedBedType: string;
  selectedRoomFloor: string;
  selectedRoomStatus: string;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectedRoomFloor: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectedRoomStatus: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelRoom = ({
  totalRooms,
  availableRooms,
  bookedRooms,
  onAddRoom,
  handleSelectedBedType,
  handleSelectedRoomFloor,
  handleSelectedRoomStatus,
}: LabelRoomProps) => {
  return (
    <Box
      cursor="pointer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 20px"
            _hover={{
              border: "1px solid rgb(21, 112, 239)",
              bg: "blue.100",
              color: "blue.500",
              transition: "background-color 0.2s ease",
            }}
          >
            All rooms ({totalRooms})
          </Text>
        </ListItem>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 20px"
            _hover={{
              border: "1px solid rgb(21, 112, 239)",
              bg: "blue.100",
              color: "blue.500",
              transition: "background-color 0.2s ease",
            }}
          >
            Available rooms ({availableRooms})
          </Text>
        </ListItem>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 20px"
            _hover={{
              border: "1px solid rgb(21, 112, 239)",
              bg: "blue.100",
              color: "blue.500",
              transition: "background-color 0.2s ease",
            }}
          >
            Booked ({bookedRooms})
          </Text>
        </ListItem>
      </UnorderedList>
      <Box display="flex" gap="10px">
        <Select cursor="pointer" width="120px" onChange={handleSelectedBedType}>
          {bedTypeOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          cursor="pointer"
          width="120px"
          onChange={handleSelectedRoomFloor}
        >
          {roomFloorOptions.map((option, index) => (
            <option
              key={`${option.value}-${index}`}
              value={option.value}
              style={{
                color:
                  roomStatusColors[
                    option.value as keyof typeof roomStatusColors
                  ],
              }}
            >
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          cursor="pointer"
          width="120px"
          onChange={handleSelectedRoomStatus}
        >
          {roomStatusOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Box>
      <>
        <AddRoomModal onAddRoom={onAddRoom} />
      </>
    </Box>
  );
};

export default LabelRoom;
