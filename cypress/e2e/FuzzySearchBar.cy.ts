/// <reference types="cypress" />

import { createStyles, Autocomplete, Button, Space, Grid, Paper, Center, NativeSelect, Tooltip, AutocompleteItem, Loader, Notification } from '@mantine/core';

function generateSearchQueries(value: string, item:AutocompleteItem){
    if (!value.includes(" ")) {
        return item.value.replace(",", "").toLowerCase().trim().includes(value.toLowerCase().trim());
      } else {
        return item.value.replace(",", "").toLowerCase().trim().startsWith(value.toLowerCase().trim());
      }
   
      return null;
 }
 function searchGen(illegal: Boolean){
    let string = "";
    const letters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    const numbers = "0123456789"
    const symbols = ",./;'[]=-!@#$%^&*()_+}{:\"?><"
    let testitems = ["Singapore, Singapore", "Kuala Lumpur, Malaysia", "Gading, Jakarta, Indonesia", "Seoul, South Korea (ICN-Incheon Intl.)" ]
    testitems.forEach(item => generateSearchQueries(item, AutocompleteItem))
 }