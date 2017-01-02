// js nel quale inserire funzioni di utilizzo generale

// funzione per comparare due stringhe, equals non è utilizzabile in js
function strcmp ( str1, str2 ) { 
    return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) );
}