  /*january 16 2024 */

  package com.teamcid.teamcapplication.exception;

  public class courseNotFoundException extends RuntimeException {
      public courseNotFoundException(Long course_id){
          super("Could not found the course with id  " + course_id);
      }
  
  
  
  }
    /*january 16 2024 */
  