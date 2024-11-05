import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const CategoryList = () => {
  return (
    <div className="hidden md:block h-screen mt-5 mx-2 flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Dental</CommandItem>
            <CommandItem>Ortho</CommandItem>
            <CommandItem>Neuro</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Others">
            <CommandItem>Camps</CommandItem>
            <CommandItem>Clinics</CommandItem>
            <CommandItem>Doctors</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
