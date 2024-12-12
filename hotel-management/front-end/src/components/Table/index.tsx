import { Box, Text, UnorderedList, ListItem, Alert } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";

// Interfaces
import {
  DeleteFunctionType,
  EditFunctionType,
  RateData,
  RoomData,
  DealData,
} from "@/interfaces";

// Components
import {
  Button,
  DeleteRate,
  DeleteRoom,
  EditRateModal,
  EditRoomModal,
} from "@/components";

// utils
import {
  tableHeaders,
  renderRoomBody,
  renderRateBody,
  renderDealBody,
} from "@/utils";

export interface TableProps<T> {
  data: T[];
  type: "room" | "rate" | "guest" | "deal";
  error?: string | null;
  onDelete: (id: string) => void;
  onEdit: (updatedData: T) => void;
}

const Table = <T extends RoomData | RateData | DealData>({
  error,
  data,
  type,
  onDelete,
  onEdit,
}: TableProps<T>) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const editFunction = onEdit as <T>(updatedData: T) => void;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeId) {
        const menuElement = document.getElementById(`${activeId}`);
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setActiveId(null);
        }
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeId]);

  const toggleMenu = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  if (error) return <Alert status="error">{error}</Alert>;
  if (data.length === 0)
    return (
      <Alert
        fontWeight="500"
        color="grey.800"
        borderRadius="10px"
        status="info"
      >
        No {type}s available.
      </Alert>
    );

  const renderRow = (item: T) => {
    const result =
      type === "room"
        ? renderRoomBody(item as RoomData)
        : type === "rate"
        ? renderRateBody(item as RateData)
        : renderDealBody(item as DealData);

    return (
      <>
        {result.map((item, index) => (
          <Text
            key={index + `${type}-body`}
            w={item.width}
            color={item.color}
            fontWeight={item.fontWeight}
            borderRadius={item.borderRadius}
            p={item.p}
            m={item?.m}
            bg={item.bg}
            display={item.display}
            justifyContent={item.justifyContent}
            fontSize={item?.fontSize}
          >
            {item.value instanceof Date
              ? item.value.toLocaleString()
              : item.value}
          </Text>
        ))}
      </>
    );
  };

  const toggleStyle = type === "room" ? "auto" : "20%";

  const EditFunctionModal = ({
    initialData,
    onEditFunction,
  }: EditFunctionType<T>) => {
    return type === "room" ? (
      <EditRoomModal
        initialRoomData={initialData as RoomData}
        onEditRoom={onEditFunction}
      />
    ) : (
      <EditRateModal
        initialRateData={initialData as RateData}
        onEditRate={onEditFunction}
      />
    );
  };

  const DeleteFunctionModal = ({
    documentId,
    onDeleteFunction,
  }: DeleteFunctionType) => {
    return type === "room" ? (
      <DeleteRoom roomId={documentId} onDeleteRoom={onDeleteFunction} />
    ) : (
      <DeleteRate rateId={documentId} onDeleteRate={onDeleteFunction} />
    );
  };

  return (
    <Box
      borderTopLeftRadius="8px"
      borderTopRightRadius="8px"
      border="1px solid #d4e5fa"
    >
      <UnorderedList
        display="flex"
        maxW="1020px"
        w="100%"
        m="0"
        bg="grey.50"
        fontSize="12px"
        fontWeight="500"
        color="grey.500"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        p="10px 24px"
      >
        {tableHeaders(type).map((header, index) => (
          <ListItem
            key={index}
            w={header.width}
            listStyleType="none"
            ml={header.ml}
          >
            {header.label}
          </ListItem>
        ))}
      </UnorderedList>
      {data.map((item: T) => {
        return (
          <Box
            key={item.documentId}
            fontSize="14px"
            fontWeight="400"
            display="flex"
            maxW="1020px"
            w="100%"
            p="17px 24px"
            position="relative"
            border="1px solid #d4e5fa"
          >
            {renderRow(item)}

            <Box display="flex" justifyContent="flex-end" w={toggleStyle}>
              <Button
                bg="white.200"
                color="grey.800"
                _hover={{ bg: "white.200" }}
                height="15px"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(item.documentId);
                }}
                text={"⋮"}
                buttonType={"primary"}
                variant={"contained"}
                colorScheme={"primary"}
              />
            </Box>

            {activeId === item.documentId && (
              <Box
                id={item.documentId}
                top="25px"
                right="70px"
                position="absolute"
                backgroundColor="white.200"
                border="1px solid #989fad"
                p="7px"
                boxShadow="0px 4px 8px rgba(57, 56, 56, 0.466)"
                display="flex"
                flexDirection="column"
                gap="10px"
                zIndex="100"
                borderRadius="8px"
                w="80px"
              >
                <EditFunctionModal
                  initialData={item}
                  onEditFunction={editFunction}
                />
                <DeleteFunctionModal
                  documentId={item.documentId}
                  onDeleteFunction={onDelete}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

const genericMemo: <T>(component: T) => T = memo;

export default genericMemo(Table);
