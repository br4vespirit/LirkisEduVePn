package com.tuke.lirkiseduvepnservice.model.dao;

import com.tuke.lirkiseduvepnservice.model.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Entity, that represents table users. It consists from standard fields like nickname, firstname, lastname,
 * from authentication data as email, password, role and if account is enabled or not and some additional data like
 * confirmation tokens and others.
 */
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    private String nickname;

    private String email;

    private String firstname;

    private String lastname;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToMany
    @JoinTable(
            name = "users_groups",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id")
    )
    private List<Group> groups;

    @OneToMany(mappedBy = "user")
    private List<TaskSession> taskSessions;

    private boolean isEnabled;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<ConfirmationToken> tokens;

    // TODO: add ROLE_ before role.name()
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
