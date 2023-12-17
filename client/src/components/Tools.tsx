/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/inline-code";
import { uploadImage } from "../common/aws";

const uploadImageByURL = async (event) => {
  const link = new Promise((resolve, reject) => {
    try {
      resolve(event);
    } catch (error) {
      reject(error);
    }
  });
  const url = await link;
  return {
    success: 1,
    file: { url },
  };
};

const uploadImageByFile = async (event) => {
  const url = await uploadImage(event);

  if (url) {
    return {
      success: 1,
      file: { url },
    };
  }
};

export const tools = {
  embed: Embed,
  link: Link,
  list: {
    class: List,
    inlineToolbar: true,
  },
  marker: Marker,
  header: Header,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  inlineCode: InlineCode,
};
