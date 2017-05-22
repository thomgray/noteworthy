# c

- [Banas](https://www.youtube.com/watch?v=nXvy5900m3M)
- [Stanford](https://www.youtube.com/watch?v=Ps8jOj7diA0&list=PLD28639E2FFC4B86A&index=1);

## basics

### native methods

```c
sizeof(class);
// returns the number of bytes for the parameter type
```

### stdio
__import__
```c
#include <stdio.h>
```
__printf__:
```c
printf("formatted string %arg1 %arg2 ...", arg1, arg2 /*...*/);
```

__scanf__:
```c
int arg;
scanf("%d\n", &arg);
```

__fgets__
```c
int thingLength = 50;
char thing[thingLength]; 
fgets(thing, thingLength, stdin);
```

__fputs__
```c
fputs("thing", stdout);
```
__puts__
```c
puts();
```

## dynamic memory ["malloc";"realloc";"memcpy"]

__malloc__
```c
#include <stdlib.h>
// Initialize a int pointer (for an array)
int * pNumber
// decide the size of the array
int amountOfInts = 10;
// allocate the memory for the array
pNumber = (int *) malloc(amountOfInts * sizeof(int));

// check that the allocation was successful
if (pNumber != NULL) {
    // code
}
```
__memcpy__
```c
#include <string.h>

memcpy(void* dest, void* src, int length);
```

// free the memory
free(pNumber);

```

## sleep

```c
#include <unistd.h>

int timeInSeconds = 3;
sleep(timeInSeconds);
```

## building ["compil(e|ing)"; "link(ing)?"; "build(ing)?"]

__compile and link__:
```sh
gcc main.c
# defaults to a.out
gcc main.c -o programName
# specifies a name for the result executable
```

__compile__:
```sh
gcc -c file.c
# builds the object file without linking
gcc -I <dir> -c file.c
# build the object file looking in the specified directory for referenced header files
```

__linking__:

The job of the linker is to link together a bunch of object files (.o files) into a binary executable

```sh
gcc foo.o bar.o baz.o -o myprog
# creates the executable myprog.out by linking the parameter object files
gcc -Wall -c foo.cc
# show all compiler warnings
```



```sh
ar rs <libname>.a objectFile.o # , sub.o ...
```

## libraries

__static__:
compile the source files
```sh
gcc -c $(ls ./*c)
```

create the static library from the object files:
```sh
ar -cvq libname.a *.o
```
opts:
- c: Whenever an archive is created, an informational message to that effect is written to standard error
- v: verbose output
- q: Quickly append the specified files to the archive. If the archive does not exist a new archive file is created

gives you the file `libname.a`

__list files in lib__:
```sh
ar -t libname.a
```
