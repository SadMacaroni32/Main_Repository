package com.teamcid.teamcapplication.exception;

public class chapterNotFoundException extends RuntimeException {
    public chapterNotFoundException(Long chapter_id){
        super("Could not found the chapter with id  " + chapter_id);
    } 

}
