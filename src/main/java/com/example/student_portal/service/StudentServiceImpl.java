package com.example.student_portal.service;

import com.example.student_portal.model.Student;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    // In-memory database using a Map
    private final Map<Long, Student> studentDb = new HashMap<>();
    private final AtomicLong idCounter = new AtomicLong();

    public StudentServiceImpl() {
        // Add some sample data
        Student student1 = new Student(idCounter.incrementAndGet(), "John Doe", 21,
                "john@example.com", "Computer Science", "CS123456");
        Student student2 = new Student(idCounter.incrementAndGet(), "Jane Smith", 22,
                "jane@example.com", "Mathematics", "MT789012");
        Student student3 = new Student(idCounter.incrementAndGet(), "Bob Johnson", 20,
                "bob@example.com", "Physics", "PH345678");

        studentDb.put(student1.getId(), student1);
        studentDb.put(student2.getId(), student2);
        studentDb.put(student3.getId(), student3);
    }

    @Override
    public List<Student> getAllStudents() {
        return new ArrayList<>(studentDb.values());
    }

    @Override
    public Optional<Student> getStudentById(Long id) {
        return Optional.ofNullable(studentDb.get(id));
    }

    @Override
    public Student saveStudent(Student student) {
        if (student.getId() == null) {
            // New student
            student.setId(idCounter.incrementAndGet());
        }
        studentDb.put(student.getId(), student);
        return student;
    }

    @Override
    public void deleteStudent(Long id) {
        studentDb.remove(id);
    }

    @Override
    public List<Student> searchStudents(String keyword) {
        String keywordLower = keyword.toLowerCase();
        return studentDb.values().stream()
                .filter(student -> student.getName().toLowerCase().contains(keywordLower) ||
                        student.getEmail().toLowerCase().contains(keywordLower) ||
                        student.getCourse().toLowerCase().contains(keywordLower) ||
                        student.getStudentId().toLowerCase().contains(keywordLower))
                .collect(Collectors.toList());
    }



    @Override
    public List<Student> sortStudents(List<Student> students, String field, String direction) {
        Comparator<Student> comparator = switch (field) {
            case "name" -> Comparator.comparing(Student::getName);
            case "age" -> Comparator.comparing(Student::getAge);
            case "email" -> Comparator.comparing(Student::getEmail);
            case "course" -> Comparator.comparing(Student::getCourse);
            case "studentId" -> Comparator.comparing(Student::getStudentId);
            default -> Comparator.comparing(Student::getId);
        };

        if ("desc".equalsIgnoreCase(direction)) {
            comparator = comparator.reversed();
        }

        return students.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}
