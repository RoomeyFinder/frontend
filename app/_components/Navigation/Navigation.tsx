"use client"
import { Flex, HStack, Link } from "@chakra-ui/layout";
import { Show } from "@chakra-ui/media-query";
import MessageIcon from "../../_assets/MessageIcon";
import NotificationIcon from "../../_assets/NotificationIcon";
import HamburgerIcon from "../../_assets/HamburgerIcon";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Menu, MenuButton, MenuList, MenuItem, chakra, Icon, Text, MenuDivider, List, ListItem, Box, Slide, Fade } from "@chakra-ui/react";
import EditIcon from "../../_assets/EditIcon";
import HeartIcon from "../../_assets/HeartIcon";
import GrowthIcon from "../../_assets/GrowthIcon";
import BoltIcon from "../../_assets/BoltIcon";
import QuestionMarkCircled from "../../_assets/QuestionMarkCircled";
import HeartShineIcon from "../../_assets/HeartShineIcon";
import LeftChevron from "@/app/_assets/LeftChevron";
import PublicNavigation from "./PublicNavigation";
import PrivateNavigation from "./PrivateNavigation";

export default function Navigation({ isAuthenticated }: {
  isAuthenticated: Boolean
}) {
  if (isAuthenticated) return <PrivateNavigation />
  return <PublicNavigation />
}
