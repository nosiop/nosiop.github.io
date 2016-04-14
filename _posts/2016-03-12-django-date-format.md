---
layout: post
title:  "Django 模板日期格式化列表"
date:   2016-03-14
categories: django
comments: true
excerpt: 
---

* content
{:toc}

    a: 'a.m.' or 'p.m.'                                                                    'a.m.'
    A: 'AM' or 'PM'.                                                                       'AM'
    b: Month, textual, three letters, lowercase                                            'jan'
    d: Day of the month, two digits with leading zeros.                                    '01'to'31'
    D: Day of the week, textual, three letters.                                            'Fri'
    f: Time, in 12-hour hours and minutes, with minutes left off if theyre zero.           '1', '1:30'
    F: Month, textual, long.                                                               'January'
    g: Hour, 12-hour format without leading zeros.                                         '1' to '12'
    G: Hour, 24-hour format without leading zeros.                                         '0' to '23'
    h: Hour, 12-hour format.                                                               '01' to '12'
    H: Hour, 24-hour format.                                                               '00' to '23'
    i: Minutes.                                                                            '00' to '59'
    j: Day of the month without leading zeros.                                             '1' to '31'
    l: Day of the week, textual, long.                                                     'Friday'
    L: Boolean for whether its a leap year.                                                True or False
    m: Month, two digits with leading zeros.                                               '01' to '12'
    M: Month, textual, three letters.                                                      'Jan'
    n: Month without leading zeros.                                                        '1' to '12'
    N: Month abbreviation in Associated Press style.                                       'Jan.', 'Feb.', 'March', 'May'
    O: Difference to Greenwich Mean Time in hours.                                         '+0200'
    r: RFC 822 formatted date.                                                             'Thu, 21 Dec 2000 16:01:07 +0200'
    s: Seconds, two digits with leading zeros.                                             '00' to '59'
    S: English ordinal suffix for day of the month, two characters.                        'st', 'nd', 'rd' or 'th'
    t: Number of days in the given month.                                                  28 to 31
    T: Time zone of this machine.                                                          'EST', 'MDT'
    w: Day of the week, digits without leading zeros.                                      '0' (Sunday) to '6' (Saturday)
    W: ISO-8601 week number of year, with weeks starting on Monday.                        1, 23
    y: Year, two digits.                                                                   '99'
    Y: Year, four digits.                                                                  '1999'
    z: Day of the year.                                                                    0 to 365
    P: Time, in 12-hour hours, minutes, and a.m./p.m., with minutes left off               '1 a.m.','1:30p.m.','midnight','noon','12:30p.m.'
       if theyre zero and the special-case strings 'midnight' and 'noon' if appropriate
    Z: Time zone offset in seconds. The offset for time zones west of UTC is always negative, and for those east of UTC it is always positive.
