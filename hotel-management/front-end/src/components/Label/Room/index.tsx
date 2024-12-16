import { Box, UnorderedList, ListItem, Text, Select } from "@chakra-ui/react";
import { ChangeEvent } from "react";

// InterFace
import { NewRoomData } from "@/interfaces";

// Constants
import {
  roomFloorOptions,
  roomStatusColors,
  roomStatusOptions,
} from "@/constants";

// Components
import { AddRoomModal } from "@/components";
import { useRateStore } from "@/stores";

export interface LabelRoomProps {
  width?: string;
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  onAddRoom: (roomData: NewRoomData) => Promise<void>;
  selectedBedType: string;
  isAddRoom: boolean;
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

  isAddRoom,
  width = "100%",
}: LabelRoomProps) => {
  const closeModal = () => {};
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);

  return (
    <Box
      cursor="pointer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
      width={width}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 17px"
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
        <Select
          fontSize="13px"
          cursor="pointer"
          width="120px"
          onChange={handleSelectedBedType}
          placeholder="Filter type"
        >
          {bedTypeOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Select
          fontSize="13px"
          cursor="pointer"
          width="120px"
          placeholder="Filter floor"
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
          fontSize="13px"
          cursor="pointer"
          width="130px"
          placeholder="Filter status"
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
        <AddRoomModal
          onAddRoom={onAddRoom}
          isDisabled={isAddRoom}
          onClose={closeModal}
          bedTypeOptions={bedTypeOptions}
        />
      </>
    </Box>
  );
};

export default LabelRoom;
