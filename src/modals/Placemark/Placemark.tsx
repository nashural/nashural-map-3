import "./desktop.css";

import { AnchorButton, Button } from "../../components/Button";
import {
  Modal,
  ModalBody,
  ModalButtons,
  ModalClose,
  ModalFooter,
  ModalHeader,
} from "../modal";
import React, { FC, useCallback } from "react";

import { GeoJSONCoordinates } from "../../typings";
import { PlacemarkProps } from "./typings.d";
import { appendRoute } from "../../store/slices/router";
import { nanoid } from "nanoid";
import { useDispatch } from "../../hooks/useDispatch";
import { useModal } from "../../hooks/useModal";

export const Placemark: FC<PlacemarkProps> = () => {
  const dispatch = useDispatch();
  const [opened, props, toggle] = useModal("placemark");

  const handleClose = useCallback(() => {
    toggle(props);
  }, [props, toggle]);

  const handleAddToRoute = useCallback(() => {
    dispatch(
      appendRoute({
        route: {
          id: nanoid(),
          name: props.title as string,
          coordinates: props.coordinates as GeoJSONCoordinates,
          immutable: true,
        },
      })
    );
    toggle(props);
  }, [dispatch, props, toggle]);

  if (opened) {
    const { title, src, href } = props;

    const srcWithoutProto = src.replace(/(^\w+:|^)\/\//, "");

    return (
      <Modal>
        <ModalHeader>
          {title}
          <ModalClose onClose={handleClose} />
        </ModalHeader>
        <ModalBody>
          <figure>
            <img
              className="Placemark-image"
              src={`https://${srcWithoutProto}`}
              alt={title}
            />
          </figure>
        </ModalBody>
        <ModalFooter>
          <ModalButtons>
            <AnchorButton href={href} target="_blank">
              Читать далее
            </AnchorButton>
            <Button onClick={handleAddToRoute}>
              Добавить как точку маршрута
            </Button>
          </ModalButtons>
        </ModalFooter>
      </Modal>
    );
  } else {
    return null;
  }
};
