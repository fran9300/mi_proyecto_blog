package com.kin.blog.service;

import java.util.List;
import java.util.Optional;

import com.kin.blog.model.Post;

public interface PostService {

    Post save(Post post);
    List<Post> findAll();
    Optional<Post> findById(Long id);
    void deleteById(Long id);

}
